import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import {
  CommandClickEventArgs,
  CommandColumnService,
  CommandModel,
  EditService,
  EditSettingsModel,
  GridComponent,
  PageService,
  SaveEventArgs,
  ToolbarItems,
  ToolbarService,
} from "@syncfusion/ej2-angular-grids";
import { DialogUtility } from "@syncfusion/ej2-angular-popups";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { LocationMaster } from "../location.model";
import { duplicateNameValidator } from "src/app/shared/utils/validators.functions";
import { LocationService } from "../location.service";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  providers: [PageService, EditService, ToolbarService, CommandColumnService],
  encapsulation: ViewEncapsulation.None,
})
export class LocationComponent implements OnInit {
  locationForm: FormGroup;

  locationList: LocationMaster[];
  cityList: any[];
  @ViewChild("grid", { static: true }) grid: GridComponent;

  locationView: any;
  alreadyUsed: { codes: string[]; names: string[] } = {
    codes: [],
    names: [],
  };
  @ViewChild("content") modelPopup: any;
  submitClicked: boolean;
  public DialogObj;

  constructor(
    private toastr: ToasterServiceService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private locationService: LocationService,
    public syncfusionHelperService: SyncfusionHelperService
  ) {}

  get locationCode() {
    return this.locationForm.get("locationCode");
  }
  get locationName() {
    return this.locationForm.get("locationName");
  }
  get cityId() {
    return this.locationForm.get("cityId");
  }

  ngOnInit(): void {
    this.getLocationList();
    this.getCities();
  }
  getLocationList() {
    this.locationService.getAll().subscribe(
      (result) => {
        this.locationList = result;
        this.alreadyUsed = {
          codes: result.map((data) => data["locationCode"].toLowerCase()),
          names: result.map((data) => data["locationName"].toLowerCase()),
        };
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the location list");
      }
    );
  }

  getCities() {
    this.locationService.getCities().subscribe(
      (result) => {
        this.cityList = result;
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the cities");
      }
    );
  }

  createFormGroup(locationData?: any): FormGroup {
    return this.formBuilder.group({
      id: [!locationData ? 0 : locationData.id],
      locationCode: [
        {
          value: locationData ? locationData.locationCode : "",
          disabled: true,
        },
        [],
      ],
      locationName: [
        locationData ? locationData.locationName : "",
        [
          Validators.required,
          Validators.maxLength(36),
          Validators.pattern(/^[a-zA-Z ]*$/),
        ],
      ],
      cityId: [locationData ? locationData.cityId : "", [Validators.required]],
    });
  }

  commandClick(args: CommandClickEventArgs): void {
    if (args.commandColumn.buttonOption.content === "View") {
      this.locationView = args.rowData;
      this.open(this.modelPopup);
    }
  }

  open(content: any) {
    this.modalService
    .open(content, { ariaLabelledBy: "modal-basic-title", size: "xl" })
      .result.then(
        () => {},
        () => {}
      );
  }

  actionComplete(args) {
    if (args.requestType === "beginEdit" || args.requestType === "add") {
      var cancelBtn =
        args.dialog.element.querySelector(".e-footer-content").children[1];
      if (cancelBtn) {
        cancelBtn.style.background = "grey";
        cancelBtn.style.color = "white";
      }
      args.dialog.width = "25%";
      args.dialog.headerEle.style.color = "#0366d6";
      const dialog = args.dialog;
      dialog.header =
        args.requestType === "beginEdit"
          ? "Edit Location Details"
          : "Add  Location Details";
    }
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === "add") {
      this.submitClicked = false;
      this.locationForm = this.createFormGroup();
    }
    if (args.requestType === "beginEdit") {
      this.submitClicked = false;
      this.locationForm = this.createFormGroup();
      this.locationService.getbyId(args.rowData).subscribe((response) => {
        this.locationForm = this.createFormGroup(response);
      });
    }
    if (args.requestType === "save") {
      args.cancel = true;
      this.submitClicked = true;
      if (this.locationForm.valid) {
        const insertdata = this.locationForm.getRawValue();
        insertdata.isArchived = false;
        if (!insertdata.id) {
          this.locationService.add(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage("Location added successfully!");
                this.grid.closeEdit();
                this.getLocationList();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage("Unable to add Location");
            }
          );
        } else {
          this.locationService.update(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage(
                  "Location updated successfully!"
                );
                this.grid.closeEdit();
                this.getLocationList();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage("Unable to update Location");
            }
          );
        }
      } else {
        args.cancel = true;
      }
    } else if (args.requestType === "delete") {
      args.cancel = true;
      this.onOpenDialogDelete(args.data);
    }
  }

  public onOpenDialogDelete = function (data: any): void {
    const [{ id, locationCode, ...remainingData }, ...others] = data;
    this.DialogObj = DialogUtility.confirm({
      title: "Location",
      content: `Are you sure you want to delete Location <span style="color:red;font-weight:bold"> ${locationCode} </span>?`,
      okButton: { text: "OK", click: this.okClickDelete.bind(this, id) },
      showCloseIcon: true,
      closeOnEscape: true,
      animationSettings: { effect: "Zoom" },
    });
  };

  okClickDelete(id): void {
    this.locationService.delete(id).subscribe(
      (res) => {
        if (res) {
          this.toastr.showSuccessMessage("location deleted successfully!");
          this.DialogObj.hide();
          this.getLocationList();
        }
      },
      (error) => {
        console.error("err", error);
        this.toastr.showErrorMessage("Unable to delete the location Details");
        this.DialogObj.hide();
      }
    );
  }

  // load(){
  //   (this.grid.localeObj as any).currentLocale.CancelButton = 'Clear';
  //   }
}
