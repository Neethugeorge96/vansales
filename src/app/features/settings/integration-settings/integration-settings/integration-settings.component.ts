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

import { IntegrationSettings } from "../integration.model";
import { IntegrationSettingsService } from "../integration-settings.service";
import { duplicateNameValidator } from "src/app/shared/utils/validators.functions";
import * as _ from "lodash";

@Component({
  selector: "app-integration-settings",
  templateUrl: "./integration-settings.component.html",
})
export class IntegrationSettingsComponent implements OnInit {
  integrationForm: FormGroup;
  @ViewChild("grid", { static: true }) grid: GridComponent;
  integrationList: IntegrationSettings[];
  integrationView: any;
  editData: any;

  versions = [
    {
      version: "V0",
      id: 0,
    },
    {
      version: "V1",
      id: 1,
    },
    {
      version: "V2",
      id: 2,
    },
  ];
  get name() {
    return this.integrationForm.get("name");
  }
  get url() {
    return this.integrationForm.get("url");
  }
  get version() {
    return this.integrationForm.get("version");
  }
  get companyId() {
    return this.integrationForm.get("companyId");
  }
  get xapiKey() {
    return this.integrationForm.get("xapiKey");
  }

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
    private integrationService: IntegrationSettingsService,
    public syncfusionHelperService: SyncfusionHelperService
  ) {}

  ngOnInit(): void {
    this.getIntegrationList();
  }
  createFormGroup(integrationData?: any): FormGroup {
    return this.formBuilder.group({
      id: [!integrationData ? 0 : integrationData.id],
      name: [
        integrationData ? integrationData.name : "",
        [
          Validators.required,
          duplicateNameValidator(
            this.alreadyUsed.names.filter(
              (name) => name !== (integrationData?.name || "").toLowerCase()
            )
          ),
        ],
      ],
      url: [
        integrationData ? integrationData.url : "",
        [
          Validators.required,
          // Validators.maxLength(36),

          duplicateNameValidator(
            this.alreadyUsed.codes.filter(
              (name) => name !== (integrationData?.url || "").toLowerCase()
            )
          ),
        ],
      ],
      version: [
        integrationData ? integrationData.version : "",
        [
          Validators.required,
          // Validators.maxLength(36),
        ],
      ],
      companyId: [
        integrationData ? integrationData.companyId : "",
        [
          Validators.required,
          // Validators.maxLength(36),
        ],
      ],

      xapiKey: [integrationData ? integrationData.xapiKey : ""],
    });
  }

  versionChange(event) {
    if (event.value == "V2") {
      this.integrationForm.controls["xapiKey"].setValidators(
        Validators.required
      );
      this.integrationForm.controls["xapiKey"].updateValueAndValidity();
    }
    if (
      event.value == "V0" &&
      _.findIndex(this.integrationList, ["version", "V0"]) != -1 &&
      this.editData.version != "V0"
    ) {
      this.toastr.showWarningMessage("Version V0 cannot be duplicated");
      this.integrationForm.controls["version"].setValue(null);
    }
  }

  getIntegrationList() {
    this.integrationService.getAll().subscribe(
      (result) => {
        this.integrationList = result;
        this.alreadyUsed = {
          codes: result.map((data: any) => data.url.toLowerCase()),
          names: result.map((data: any) => data.name.toLowerCase()),
        };
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the integration list");
      }
    );
  }
  commandClick(args: CommandClickEventArgs): void {
    if (args.commandColumn.buttonOption.content === "View") {
      this.integrationView = args.rowData;
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
          ? "Edit Integration Details"
          : "Add Integration Details";
      // (args.form.elements.namedItem("") as HTMLInputElement).blur();
    }
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === "add") {
      this.submitClicked = false;
      this.integrationForm = this.createFormGroup();
      this.editData = {};
    }
    if (args.requestType === "beginEdit") {
      this.submitClicked = false;
      this.integrationForm = this.createFormGroup(args.rowData);
      this.editData = args.rowData;
    }
    if (args.requestType === "save") {
      args.cancel = true;
      this.submitClicked = true;
      if (this.integrationForm.valid) {
        const insertdata = this.integrationForm.getRawValue();
        if (!insertdata.id) {
          this.integrationService.add(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage(
                  "Integration settings added successfully!"
                );
                this.grid.closeEdit();
                this.getIntegrationList();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage(
                "Unable to add Integration settings"
              );
            }
          );
        } else {
          this.integrationService.update(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage(
                  "Integration settings updated successfully!"
                );
                this.grid.closeEdit();
                this.getIntegrationList();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage(
                "Unable to update Integration settings"
              );
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
    const [{ id, name, ...remainingData }, ...others] = data;
    this.DialogObj = DialogUtility.confirm({
      title: "Integration",
      content: `Are you sure you want to delete Integration settings <span style="color:red;font-weight:bold">${name}</span>?`,
      okButton: { text: "OK", click: this.okClickDelete.bind(this, id) },
      showCloseIcon: true,
      closeOnEscape: true,
      animationSettings: { effect: "Zoom" },
    });
  };

  okClickDelete(id): void {
    this.integrationService.delete(id).subscribe(
      (res) => {
        if (res) {
          this.toastr.showSuccessMessage("Integration deleted successfully!");
          this.DialogObj.hide();
          this.getIntegrationList();
        }
      },
      (error) => {
        console.error("err", error);
        this.toastr.showErrorMessage("Unable to delete Integration Details");
        this.DialogObj.hide();
      }
    );
  }
}
