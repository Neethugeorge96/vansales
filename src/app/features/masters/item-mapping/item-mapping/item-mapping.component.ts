import { Component, OnInit, ViewChild } from "@angular/core";
import {
  CommandColumnService,
  CommandClickEventArgs,
  EditService,
  PageService,
  ToolbarService,
  GridComponent,
  SaveEventArgs,
} from "@syncfusion/ej2-angular-grids";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToasterServiceService } from "../../../../core/services/toaster-service.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ItemMappingService } from "../item-mapping.service";
import { SyncfusionHelperService } from "../../../../shared/services/syncfusion-helper.service";
import { DialogUtility } from "@syncfusion/ej2-popups";
import { ItemMappingMasterViewModel } from "../item-mapping.model";
import { ItemsService } from "src/app/features/masters/items/items.service";
import { CustomerService } from "../../customer/customer.service";
import { dropDownformatter } from "src/app/shared/utils/common.functions";
import { HttpParams } from "@angular/common/http";
import * as _ from "lodash";

@Component({
  selector: "app-item-mapping",
  templateUrl: "./item-mapping.component.html",
  providers: [PageService, EditService, ToolbarService, CommandColumnService],
})
export class ItemMappingComponent implements OnInit {
  itemMappingForm: FormGroup;

  itemMappingList: ItemMappingMasterViewModel[];
  itemsList: any[];
  mappedItemList: any[];
  customerList: any[];
  allItemsList: any[];
  baseItemCode: any;
  editingData: any;
  // customerBool : boolean = false;

  itemMappingView: any;
  @ViewChild("grid", { static: true }) grid: GridComponent;
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
    private itemMappingService: ItemMappingService,
    public syncfusionHelperService: SyncfusionHelperService,
    private itemsService: ItemsService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    // this.itemMappingForm = this.createFormGroup();
    this.getAllitemMappedList();
    this.getItemsList();
    this.getCustomerList();
  }

  get mappingCode() {
    return this.itemMappingForm.get("mappingCode");
  }
  get customerCode() {
    return this.itemMappingForm.get("customerId");
  }
  get baseItem() {
    return this.itemMappingForm.get("baseItemId");
  }
  get mappedItem() {
    return this.itemMappingForm.get("mappedItemId");
  }

  createFormGroup(itemMappingData?: any): FormGroup {
    return this.formBuilder.group({
      id: [!itemMappingData ? 0 : itemMappingData.id],

      mappingCode: [
        {
          value: itemMappingData ? itemMappingData.mappingCode : "",
          disabled: true,
        },
        [],
      ],

      customerId: [
        itemMappingData ? itemMappingData.customerId : "",
        [Validators.required],
      ],
      baseItemId: [
        itemMappingData ? itemMappingData.baseItemId : "",
        [Validators.required],
      ],
      mappedItemId: [
        itemMappingData ? itemMappingData.mappedItemId : "",
        [Validators.required],
      ],
    });
  }

  commandClick(args: CommandClickEventArgs): void {
    if (args.commandColumn.buttonOption.content === "View") {
      console.log(args.rowData);

      this.itemMappingView = args.rowData;
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

  getAllitemMappedList() {
    this.itemMappingService.getAll().subscribe(
      (result) => {
        this.itemMappingList = result;
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the mapped item list");
      }
    );
  }

  getItemsList() {
    this.itemsService.getAll().subscribe(
      (result) => {
        this.mappedItemList = this.itemsList = dropDownformatter(
          result,
          "code",
          "itemName"
        );
        this.allItemsList = this.mappedItemList;
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the items list");
      }
    );
  }

  getCustomerList() {
    let params = new HttpParams();
    params = params.append("saleTypeId", "0");
    params = params.append("customerStatus", "0");
    this.customerService.getAll(params).subscribe(
      (result) => {
        result = _.filter(result, ["activeStatus", 1]);
        this.customerList = dropDownformatter(result, "code", "customerName");
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the customer list");
      }
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
          ? "Edit Item Mapping"
          : "Add Item Mapping";
      // (args.form.elements.namedItem("vanNumber") as HTMLInputElement).blur();
    }
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === "add") {
      this.submitClicked = false;
      this.editingData = null;
      this.itemMappingForm = this.createFormGroup();
    }
    if (args.requestType === "beginEdit") {
      this.submitClicked = false;
      // console.log("data",args.rowData);
      // this.itemMappingForm = this.createFormGroup(args.rowData);

      this.itemMappingForm = this.createFormGroup();
      this.itemMappingService.getbyId(args.rowData).subscribe((response) => {
        this.editingData = response;
        this.itemMappingForm = this.createFormGroup(response);
      });
    }
    if (args.requestType === "save") {
      args.cancel = true;
      this.submitClicked = true;
      if (this.itemMappingForm.valid) {
        const insertdata = this.itemMappingForm.getRawValue();
        insertdata.isArchived = false;
        if (!insertdata.id) {
          this.itemMappingService.add(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage(
                  "Item Mapping added successfully!"
                );
                this.grid.closeEdit();
                this.getAllitemMappedList();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage("Unable to add item mapping");
            }
          );
        } else {
          this.itemMappingService.update(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage(
                  "Item Mapping updated successfully!"
                );
                this.grid.closeEdit();
                this.getAllitemMappedList();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage("Unable to update item mapping");
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
    const [{ id, mappingCode, ...remainingData }, ...others] = data;
    this.DialogObj = DialogUtility.confirm({
      title: "Item Mapping",
      content: `Are you sure you want to delete the Item Mapping <span style="color:red;font-weight:bold"> ${mappingCode} </span>?`,
      okButton: { text: "OK", click: this.okClickDelete.bind(this, id) },
      showCloseIcon: true,
      closeOnEscape: true,
      animationSettings: { effect: "Zoom" },
    });
  };

  okClickDelete(id): void {
    this.itemMappingService.delete(id).subscribe(
      (res) => {
        if (res) {
          this.toastr.showSuccessMessage("Item Mapping deleted successfully!");
          this.DialogObj.hide();
          this.getAllitemMappedList();
        }
      },
      (error) => {
        console.error("err", error);
        this.toastr.showErrorMessage(
          "Unable to delete the item mapping  Details"
        );
        this.DialogObj.hide();
      }
    );
  }

  onBaseItemChange(event) {
    this.baseItemCode = event.itemData.code;
    let baseItemName = this.baseItemCode + " - " + event.itemData.itemName;

    this.mappedItemList = this.allItemsList.filter(
      (x) => x.code !== this.baseItemCode
    );
    let customerId = this.itemMappingForm.controls["customerId"].value;
    let customerName = this.customerList.find(
      (x) => x.id == customerId
    ).customerName;
    if (customerName) {
      if (this.editingData) {
        this.itemMappingList.map((x) => {
          if (
            x.customerName == customerName &&
            x.baseItemName == baseItemName &&
            x.customerName !=
              this.customerList.find(
                (x) => x.id == this.editingData?.customerId
              ).customerName &&
            x.baseItemName !=
              this.allItemsList.find(
                (x) => x.id == this.editingData?.baseItemId
              ).itemName
          ) {
            this.toastr.showErrorMessage(
              "Customer Name and Base Item already exists"
            );
            this.itemMappingForm.controls["baseItemId"].setValue(null);
          }
        });
      } else {
        this.itemMappingList.map((x) => {
          if (
            x.customerName == customerName &&
            x.baseItemName == baseItemName
          ) {
            this.toastr.showErrorMessage(
              "Customer Name and Base Item already exists"
            );
            this.itemMappingForm.controls["baseItemId"].setValue(null);
          }
        });
      }
    }
  }

  onCustomerChange(event) {
    let customerName = event.customerName;
    let baseItemId = this.itemMappingForm.controls["baseItemId"].value;
    if (baseItemId) {
      if (this.editingData) {
        let baseItemName = this.itemsList.find(
          (x) => x.id == baseItemId
        ).itemName;
        this.itemMappingList.map((x) => {
          if (
            x.customerName == customerName &&
            x.baseItemName == baseItemName &&
            x.customerName !=
              this.customerList.find(
                (x) => x.id == this.editingData?.customerId
              ).customerName &&
            x.baseItemName !=
              this.allItemsList.find(
                (x) => x.id == this.editingData?.baseItemId
              ).itemName
          ) {
            //  this.customerBool = true
            this.toastr.showErrorMessage(
              "Customer Name and Base Item already exists"
            );
            this.itemMappingForm.controls["customerId"].setValue(null);
          }
        });
      } else {
        let baseItemName = this.itemsList.find(
          (x) => x.id == baseItemId
        ).itemName;
        this.itemMappingList.map((x) => {
          if (
            x.customerName == customerName &&
            x.baseItemName == baseItemName
          ) {
            //  this.customerBool = true
            this.toastr.showErrorMessage(
              "Customer Name and Base Item already exists"
            );
            this.itemMappingForm.controls["customerId"].setValue(null);
          }
        });
      }
    }
  }
}
