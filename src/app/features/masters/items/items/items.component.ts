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
import { ItemsService } from "src/app/features/masters/items/items.service";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { Items } from "../items.model";
import { StorageType } from "src/app/models/common/types/storage-type.enum";
import { enumSelector } from "src/app/shared/utils/common.functions";
import { duplicateNameValidator } from "src/app/shared/utils/validators.functions";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  providers: [PageService, EditService, ToolbarService, CommandColumnService],
})
export class ItemsComponent implements OnInit {
  itemForm: FormGroup;
  @ViewChild("grid", { static: true }) grid: GridComponent;
  itemsList: Items[];
  itemView: any;
  storageTypes = StorageType;
  storageTypesenum = enumSelector(StorageType);
  uomvalues: any[];
  public toolbarExternal: ToolbarItems[] | object;
  alreadyUsed: { codes: string[]; names: string[] } = {
    codes: [],
    names: [],
  };
  @ViewChild("content") modelPopup: any;
  submitClicked: boolean;
  public DialogObj;

  showStorageClearBtn: boolean = false;

  constructor(
    private toastr: ToasterServiceService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private itemsService: ItemsService,
    public syncfusionHelperService: SyncfusionHelperService,
    private router: Router
  ) {}
  // public editSettings: EditSettingsModel = {
  //   allowEditing: true,
  //   allowAdding: true,
  //   allowDeleting: true,
  //   allowEditOnDblClick: false,
  //   mode: "Dialog",
  // };

  // public toolbar: ToolbarItems[] = ["Add", "Search"];
  // public commands: CommandModel[] = [
  //   { buttonOption: { content: "View", cssClass: "e-flat btn-view" } },
  //   {type: "Edit",buttonOption: { cssClass: "e-flat", iconCss: "e-edit e-icons" },},
  //   {type: "Delete", buttonOption: { cssClass: "e-flat", iconCss: "e-delete e-icons" },},
  //   {type: "Save",buttonOption: { cssClass: "e-flat", iconCss: "e-update e-icons" },},
  //   {type: "Cancel", buttonOption: { cssClass: "e-flat", iconCss: "e-cancel-icon e-icons" },},
  // ];

  get itemCode() {
    return this.itemForm.get("itemCode");
  }
  get code() {
    return this.itemForm.get("code");
  }
  get itemName() {
    return this.itemForm.get("itemName");
  }
  get uomMasterId() {
    return this.itemForm.get("uomMasterId");
  }
  get storageTypeId() {
    return this.itemForm.get("storageTypeId");
  }
  get sequenceNumber() {
    return this.itemForm.get("sequenceNumber");
  }
  get vatPercentage() {
    return this.itemForm.get("vatPercentage");
  }
  get isBatchItem() {
    return this.itemForm.get("isBatchItem");
  }
  get description() {
    return this.itemForm.get("description");
  }

  ngOnInit(): void {
    this.getItemsList();
    this.getUom();
    this.toolbarExternal = [
      {
        text: "Import",
        tooltipText: "Import",
        prefixIcon: "e-download-2",
        id: "Import",
      },
      "Add",
      "Search",
    ];
  }

  getItemsList() {
    this.itemsService.getAll().subscribe(
      (result) => {
        this.itemsList = result;
        this.alreadyUsed = {
          codes: result.map((data) => data["code"].toLowerCase()),
          names: result.map((data) => data["itemName"].toLowerCase()),
        };
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the items list");
      }
    );
  }

  getUom() {
    this.itemsService.getUom().subscribe((result) => {
      this.uomvalues = result;
    });
  }

  createFormGroup(itemData?: any): FormGroup {
    return this.formBuilder.group({
      id: [!itemData ? 0 : itemData.id],
      itemCode: [
        { value: itemData ? itemData.itemCode : "", disabled: true },
        [],
      ],
      code: [
        itemData ? itemData.code : "",
        [
          Validators.required,
          Validators.pattern(/^\S*$/),
          duplicateNameValidator(
            this.alreadyUsed.codes.filter(
              (code) => code !== (itemData?.code || "").toLowerCase()
            )
          ),
        ],
      ],
      itemName: [
        itemData ? itemData.itemName : "",
        [
          Validators.required,
          Validators.maxLength(32),
          duplicateNameValidator(
            this.alreadyUsed.names.filter(
              (name) => name !== (itemData?.itemName || "").toLowerCase()
            )
          ),
        ],
      ],
      // isAssigned: [itemData.isAssigned || false],
      uomMasterId: [
        itemData ? itemData.uomMasterId : "",
        [Validators.required],
      ],
      storageTypeId: [itemData ? itemData.storageTypeId : ""],
      sequenceNumber: [
        itemData ? itemData.sequenceNumber : "",
        [Validators.required, Validators.max(999999999), Validators.min(1)],
      ],
      vatPercentage: [
        itemData ? itemData.vatPercentage : 0,
        [Validators.required, Validators.max(999)],
      ],
      isBatchItem: [itemData ? itemData.isBatchItem : false, []],
      description: [
        itemData ? itemData.description : "",
        [Validators.maxLength(256), Validators.required],
      ],
    });
  }

  commandClick(args: CommandClickEventArgs): void {
    if (args.commandColumn.buttonOption.content === "View") {
      this.itemView = args.rowData;
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

  // public created(args) {
  //   const gridElement = this.grid.element;
  //   const span = document.createElement("span");
  //   span.className = "e-clear-icon";
  //   span.id = gridElement.id + "clear";
  //   span.onclick = this.cancelBtnClick.bind(this);
  //   gridElement
  //     .querySelector(".e-toolbar-item .e-input-group")
  //     .appendChild(span);
  // }

  // public cancelBtnClick(args) {
  //   this.grid.searchSettings.key = "";
  //   (
  //     this.grid.element.querySelector(".e-input-group.e-search .e-input") as any
  //   ).value = "";
  // }

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
          ? "Edit Item Details"
          : "Add Item Details";
    }
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === "add") {
      this.submitClicked = false;
      this.itemForm = this.createFormGroup();
    }
    if (args.requestType === "beginEdit") {
      this.submitClicked = false;
      this.itemForm = this.createFormGroup();
      this.itemsService.getbyId(args.rowData).subscribe((response) => {
        this.itemForm = this.createFormGroup(response);
      });
    }
    if (args.requestType === "save") {
      args.cancel = true;
      this.submitClicked = true;
      if (this.itemForm.valid) {
        const insertdata = this.itemForm.getRawValue();
        insertdata.isArchived = false;
        insertdata.storageTypeId = insertdata.storageTypeId
          ? insertdata.storageTypeId
          : 0;
        if (!insertdata.id) {
          this.itemsService.add(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage("Item added successfully!");
                this.grid.closeEdit();
                this.getItemsList();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage("Unable to add item");
            }
          );
        } else {
          this.itemsService.update(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage("Item updated successfully!");
                this.grid.closeEdit();
                this.getItemsList();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage("Unable to update item");
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
    const [{ id, code, ...remainingData }, ...others] = data;
    this.DialogObj = DialogUtility.confirm({
      title: "Items",
      content: `Are you sure you want to delete Item <span style="color:red;font-weight:bold"> ${code} </span>?`,
      okButton: { text: "OK", click: this.okClickDelete.bind(this, id) },
      showCloseIcon: true,
      closeOnEscape: true,
      animationSettings: { effect: "Zoom" },
    });
  };

  okClickDelete(id): void {
    this.itemsService.delete(id).subscribe(
      (res) => {
        if (res) {
          res == -129
            ? this.toastr.showWarningMessage("Item already used!")
            : this.toastr.showSuccessMessage("Item deleted successfully!");
          this.DialogObj.hide();
          this.getItemsList();
        }
      },
      (error) => {
        console.error("err", error);
        this.toastr.showErrorMessage("Unable to delete the Item Details");
        this.DialogObj.hide();
      }
    );
  }

  clickHandler(args): void {
    if (args.item.id === "Import") {
      this.router.navigateByUrl("masters/itemmaster/import");
    }
  }
}
