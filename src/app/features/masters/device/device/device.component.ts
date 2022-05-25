import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  CommandClickEventArgs,
  GridComponent,
  SaveEventArgs,
} from "@syncfusion/ej2-angular-grids";
import { DialogUtility } from "@syncfusion/ej2-angular-popups";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";
import { duplicateNameValidator } from "src/app/shared/utils/validators.functions";
import { DeviceMaster } from "../device.model";
import { DeviceService } from "../device.service";

@Component({
  selector: "app-device",
  templateUrl: "./device.component.html",
})
export class DeviceComponent implements OnInit {
  deviceForm: FormGroup;
  @ViewChild("grid", { static: true }) grid: GridComponent;
  deviceList: DeviceMaster[];
  deviceView: any;

  alreadyUsed: { codes: string[] } = {
    codes: [],
  };
  @ViewChild("content") modelPopup: any;
  submitClicked: boolean;
  public DialogObj;

  constructor(
    private toastr: ToasterServiceService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private deviceService: DeviceService,
    public syncfusionHelperService: SyncfusionHelperService
  ) {}

  get serialNumber() {
    return this.deviceForm.get("serialNumber");
  }
  ngOnInit(): void {
    this.getDeviceList();
  }

  createFormGroup(deviceData?: any): FormGroup {
    return this.formBuilder.group({
      id: [!deviceData ? 0 : deviceData.id],
      serialNumber: [
        deviceData ? deviceData.serialNumber : "",
        [
          Validators.required,
          Validators.maxLength(36),
          // Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/),
          // Validators.pattern(/^([0]+[a-zA-Z]+|[0]+[1-9]+)[0-9a-zA-Z]*$/),
          Validators.pattern(/0*[1-9a-zA-z][0-9a-zA-z]*(\.[0-9a-zA-z]+)?/),

          duplicateNameValidator(
            this.alreadyUsed.codes.filter(
              (name) => name !== (deviceData?.serialNumber || "").toLowerCase()
            )
          ),
        ],
      ],
      isActive: [deviceData ? deviceData.isActive : true],
    });
  }

  getDeviceList() {
    this.deviceService.getAll().subscribe(
      (result) => {
        this.deviceList = result;
        this.alreadyUsed = {
          codes: result.map((data: any) => data.serialNumber.toLowerCase()),
          //names: result.map((data) => data["reasonCode"].toLowerCase()),
        };
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the device list");
      }
    );
  }
  commandClick(args: CommandClickEventArgs): void {
    if (args.commandColumn.buttonOption.content === "View") {
      this.deviceView = args.rowData;
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
          ? "Edit Device Details"
          : "Add Device Details";
      (args.form.elements.namedItem("serialNumber") as HTMLInputElement).blur();
    }
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === "add") {
      this.submitClicked = false;
      this.deviceForm = this.createFormGroup();
    }
    if (args.requestType === "beginEdit") {
      this.submitClicked = false;
      this.deviceForm = this.createFormGroup(args.rowData);
    }
    if (args.requestType === "save") {
      args.cancel = true;
      this.submitClicked = true;
      if (this.deviceForm.valid) {
        const insertdata = this.deviceForm.getRawValue();
        if (!insertdata.id) {
          this.deviceService.add(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage("Device added successfully!");
                this.grid.closeEdit();
                this.getDeviceList();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage("Unable to add device");
            }
          );
        } else {
          this.deviceService.update(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage("Device updated successfully!");
                this.grid.closeEdit();
                this.getDeviceList();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage("Unable to update device");
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
    const [{ id, serialNumber, ...remainingData }, ...others] = data;
    this.DialogObj = DialogUtility.confirm({
      title: "Device",
      content: `Are you sure you want to delete Device <span style="color:red;font-weight:bold"> ${serialNumber} </span>?`,
      okButton: { text: "OK", click: this.okClickDelete.bind(this, id) },
      showCloseIcon: true,
      closeOnEscape: true,
      animationSettings: { effect: "Zoom" },
    });
  };

  okClickDelete(id): void {
    this.deviceService.delete(id).subscribe(
      (res) => {
        if (res) {
          this.toastr.showSuccessMessage("Device deleted successfully!");
          this.DialogObj.hide();
          this.getDeviceList();
        }
      },
      (error) => {
        console.error("err", error);
        this.toastr.showErrorMessage("Unable to delete the device Details");
        this.DialogObj.hide();
      }
    );
  }
}
