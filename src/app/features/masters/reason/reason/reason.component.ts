import { Component, OnInit, ViewChild } from "@angular/core";

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
import { ReasonCodeMaster, StockMovementType } from "../reason.model";
//import { StorageType } from "src/app/models/common/types/storage-type.enum";
import { enumSelector } from "src/app/shared/utils/common.functions";
import {
  duplicateCodeValidator,
  duplicateNameValidator,
} from "src/app/shared/utils/validators.functions";
import { ReasonService } from "../reason.service";
import { SplitByUpperCasePipe } from "src/app/pipes/split-by-upper-case.pipe";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";

@Component({
  selector: "app-reason",
  templateUrl: "./reason.component.html",
  providers: [PageService, EditService, ToolbarService, CommandColumnService],
})
export class ReasonComponent implements OnInit {
  reasonForm: FormGroup;
  @ViewChild("grid", { static: true }) grid: GridComponent;
  reasonList: ReasonCodeMaster[];
  reasonView: any;
  stockMovementType = StockMovementType;
  stockMovementTypeList = enumSelector(StockMovementType);

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
    private reasonService: ReasonService,
    private splitByUpperCasePipe: SplitByUpperCasePipe,
    public syncfusionHelperService: SyncfusionHelperService
  ) {}

  get reasonCode() {
    return this.reasonForm.get("reasonCode");
  }
  get description() {
    return this.reasonForm.get("description");
  }
  get stockMovementTypeId() {
    return this.reasonForm.get("stockMovementTypeId");
  }
  ngOnInit(): void {
    this.getReasonList();
  }

  createFormGroup(reasonData?: any): FormGroup {
    return this.formBuilder.group({
      id: [!reasonData ? 0 : reasonData.id],
      reasonCode: [
        { value: reasonData ? reasonData.reasonCode : "", disabled: true },
        [],
      ],
      description: [
        reasonData ? reasonData.description : "",
        [Validators.required, Validators.maxLength(126)],
      ],
      // isAssigned: [itemData.isAssigned || false],
      stockMovementTypeId: [
        reasonData ? reasonData.stockMovementTypeId : "",
        [Validators.required],
      ],
    });
  }

  public stockMovementTypeName = (
    field: string,
    data: Object,
    column: Object
  ) => {
    return this.splitByUpperCasePipe.transform(this.stockMovementType[field]);
  };
  getReasonList() {
    this.reasonService.getAll().subscribe(
      (result) => {
        this.reasonList = result;
        this.alreadyUsed = {
          codes: result.map((data: any) => data.reasonCode.toLowerCase()),
          //names: result.map((data) => data["reasonCode"].toLowerCase()),
        };
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the reason list");
      }
    );
  }
  commandClick(args: CommandClickEventArgs): void {
    if (args.commandColumn.buttonOption.content === "View") {
      this.reasonView = args.rowData;
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
          ? "Edit Reason Code Details"
          : "Add Reason Code Details";
    }
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === "add") {
      this.submitClicked = false;
      this.reasonForm = this.createFormGroup();
    }
    if (args.requestType === "beginEdit") {
      this.submitClicked = false;
      this.reasonForm = this.createFormGroup(args.rowData);
    }
    if (args.requestType === "save") {
      args.cancel = true;
      this.submitClicked = true;
      if (this.reasonForm.valid) {
        const insertdata = this.reasonForm.getRawValue();
        insertdata.isArchived = false;
        if (!insertdata.id) {
          this.reasonService.add(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage(
                  "Reason Code added successfully!"
                );
                this.grid.closeEdit();
                this.getReasonList();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage("Unable to add reason code");
            }
          );
        } else {
          this.reasonService.update(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage(
                  "Reason Code updated successfully!"
                );
                this.grid.closeEdit();
                this.getReasonList();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage("Unable to update reason code");
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
    const [{ id, reasonCode, ...remainingData }, ...others] = data;
    this.DialogObj = DialogUtility.confirm({
      title: "Reason Code",
      content: `Are you sure you want to delete the Reason Code<span style="color:red;font-weight:bold"> ${reasonCode} </span>?`,
      okButton: { text: "OK", click: this.okClickDelete.bind(this, id) },
      showCloseIcon: true,
      closeOnEscape: true,
      animationSettings: { effect: "Zoom" },
    });
  };

  okClickDelete(id): void {
    this.reasonService.delete(id).subscribe(
      (res) => {
        if (res) {
          this.toastr.showSuccessMessage("Reason Code deleted successfully!");
          this.DialogObj.hide();
          this.getReasonList();
        }
      },
      (error) => {
        console.error("err", error);
        this.toastr.showErrorMessage("Unable to delete the reason code");
        this.DialogObj.hide();
      }
    );
  }
}
