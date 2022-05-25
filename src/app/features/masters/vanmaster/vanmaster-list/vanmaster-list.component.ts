import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { DialogUtility } from "@syncfusion/ej2-angular-popups";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { duplicateNameValidator } from "src/app/shared/utils/validators.functions";
import { VanMaster } from "../vanmaster.model";
import { VanmasterService } from "../vanmaster.service";
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
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";

@Component({
  selector: "app-vanmaster-list",
  templateUrl: "./vanmaster-list.component.html",
  providers: [PageService, EditService, ToolbarService, CommandColumnService],
})
export class VanmasterListComponent implements OnInit {
  vanmasterForm: FormGroup;

  vanMasterList: VanMaster[];
  @ViewChild("grid", { static: true }) grid: GridComponent;

  vanmasterView: any;
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
    private vanMasterService: VanmasterService,
    public syncfusionHelperService: SyncfusionHelperService
  ) {}

  get vanNumber() {
    return this.vanmasterForm.get("vanNumber");
  }
  get vanRegNumber() {
    return this.vanmasterForm.get("vanRegNumber");
  }
  get vanModel() {
    return this.vanmasterForm.get("vanModel");
  }
  get capacity() {
    return this.vanmasterForm.get("capacity");
  }
  get color() {
    return this.vanmasterForm.get("color");
  }

  ngOnInit(): void {
    this.getVanmasterList();
  }

  getVanmasterList() {
    this.vanMasterService.getAll().subscribe(
      (result) => {
        this.vanMasterList = result;
        this.alreadyUsed = {
          codes: result.map((data) => data["vanNumber"].toLowerCase()),
          names: result.map((data) => data["vanRegNumber"].toLowerCase()),
        };
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the van list");
      }
    );
  }

  createFormGroup(vanmasterData?: any): FormGroup {
    return this.formBuilder.group({
      id: [!vanmasterData ? 0 : vanmasterData.id],
      vanNumber: [
        vanmasterData ? vanmasterData.vanNumber : "",
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.pattern("^([A-Za-z0-9 ])*"),
          Validators.pattern(/0*[1-9a-zA-z][0-9a-zA-z]*(\.[0-9a-zA-z]+)?/),
          duplicateNameValidator(
            this.alreadyUsed.codes.filter(
              (codes) =>
                codes !== (vanmasterData?.vanNumber || "").toLowerCase()
            )
          ),
        ],
      ],
      vanRegNumber: [
        vanmasterData ? vanmasterData.vanRegNumber : "",
        [
          Validators.required,
          Validators.pattern("^([A-Za-z0-9 ])*"),
          Validators.maxLength(12),
          duplicateNameValidator(
            this.alreadyUsed.names.filter(
              (names) =>
                names !== (vanmasterData?.vanRegNumber || "").toLowerCase()
            )
          ),
        ],
      ],
      vanModel: [
        vanmasterData ? vanmasterData.vanModel : "",
        [
          Validators.pattern("^([A-Za-z0-9 ])*"),
          Validators.required,
          Validators.maxLength(16),
        ],
      ],
      capacity: [
        vanmasterData ? JSON.stringify(vanmasterData.capacity) : "",
        [Validators.required, Validators.max(9999999999), , Validators.min(1)],
      ],

      color: [
        vanmasterData ? vanmasterData.color : "",
        [Validators.required, Validators.maxLength(12)],
      ],
    });
  }

  commandClick(args: CommandClickEventArgs): void {
    if (args.commandColumn.buttonOption.content === "View") {
      this.vanmasterView = args.rowData;
      this.open(this.modelPopup);
    }
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
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
          ? "Edit Van Details"
          : "Add Van Details";
      (args.form.elements.namedItem("vanNumber") as HTMLInputElement).blur();
    }
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === "add") {
      this.submitClicked = false;
      this.vanmasterForm = this.createFormGroup();
    }
    if (args.requestType === "beginEdit") {
      this.submitClicked = false;
      this.vanmasterForm = this.createFormGroup(args.rowData);
    }
    if (args.requestType === "save") {
      args.cancel = true;
      this.submitClicked = true;
      if (this.vanmasterForm.valid) {
        const insertdata = this.vanmasterForm.getRawValue();
        insertdata.isArchived = false;
        if (!insertdata.id) {
          this.vanMasterService.add(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage("Van added successfully!");
                this.grid.closeEdit();
                this.getVanmasterList();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage("Unable to add Van");
            }
          );
        } else {
          this.vanMasterService.update(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage("Van updated successfully!");
                this.grid.closeEdit();
                this.getVanmasterList();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage("Unable to update Van");
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
    const [{ id, vanNumber, ...remainingData }, ...others] = data;
    this.DialogObj = DialogUtility.confirm({
      title: "Van",
      content: `Are you sure you want to delete Van <span style="color:red;font-weight:bold"> ${vanNumber} </span>?`,
      okButton: { text: "OK", click: this.okClickDelete.bind(this, id) },
      showCloseIcon: true,
      closeOnEscape: true,
      animationSettings: { effect: "Zoom" },
    });
  };

  okClickDelete(id): void {
    this.vanMasterService.delete(id).subscribe(
      (res) => {
        if (res) {
          res == -129
            ? this.toastr.showWarningMessage("Van already used!")
            : this.toastr.showSuccessMessage("Van deleted successfully!");
          this.DialogObj.hide();
          this.getVanmasterList();
        }
      },
      (error) => {
        console.error("err", error);
        this.toastr.showErrorMessage("Unable to delete the Van Details");
        this.DialogObj.hide();
      }
    );
  }
}
