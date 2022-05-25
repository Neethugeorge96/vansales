import { Component, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  CommandClickEventArgs,
  CommandModel,
  EditSettingsModel,
  GridComponent,
  SaveEventArgs,
  SearchSettingsModel,
} from "@syncfusion/ej2-angular-grids";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";
import * as _ from "lodash";
import { ActivatedRoute, Router } from "@angular/router";

import {
  duplicateCodeValidator,
  duplicateIdValidator,
  duplicateNameValidator,
} from "src/app/shared/utils/validators.functions";
import * as moment from "moment";
import { DialogUtility } from "@syncfusion/ej2-angular-popups";
import { CustomerDiscountService } from "../customer-discount.service";
import { CustomerService } from "../../customer/customer.service";
import {
  dropDownformatter,
  sampleExcelDownloader,
} from "src/app/shared/utils/common.functions";
import { PriceListDetails } from "../customer-discount.model";
import { HttpParams } from "@angular/common/http";
import { ClickEventArgs } from "@syncfusion/ej2-navigations";

@Component({
  selector: "app-customer-discount",
  templateUrl: "./customer-discount.component.html",
})
export class CustomerDiscountComponent implements OnInit {
  @ViewChild("grid", { static: false }) grid: GridComponent;
  customerDiscountHeaderfrm: FormGroup;
  itemDiscountForm: FormGroup;
  itemPriceDiscountList: PriceListDetails[] = [];
  submitClicked: boolean;
  viewMode: boolean = false;
  uomList: any[];
  itemsList: any[];
  allItemList: any[];
  allCustomerList: any[];
  customerList: any[] = [];
  selectedValues: any[];
  selectedIndex: any;
  operators: any[];
  public DialogObj;
  customerDiscountId: any;
  maxDiscountPercent: number = 0;
  editingData: any;
  public searchOptions: SearchSettingsModel = {
    fields: [
      "itemName",
      "itemCode",
      "uomName",
      "price",
      "operator",
      "discountPercentage",
      "priceAfterDiscount",
    ],
  };
  alreadyUsed: { names: number[] } = {
    names: [],
  };

  toolbarInline = [
    {
      text: "Sample File",
      tooltipText: "Sample File",
      prefixIcon: "e-download",
      id: "sampleFile",
    },
    {
      text: "Upload File",
      tooltipText: "Upload File",
      prefixIcon: "e-upload-1",
      id: "uploadFile",
    },
    "Delete",
    "Cancel",
    "Update",
    "Edit",
    "Add",
    "Search",
  ];

  showDialog: boolean = false;
  excelData: any = [];
  gridFields: any;
  showExcelValidation: boolean = false;

  get customerDiscountCode() {
    return this.customerDiscountHeaderfrm.get("discountCode");
  }
  get customerId() {
    return this.customerDiscountHeaderfrm.get("customerId");
  }
  get isItemDiscount() {
    if (
      this.customerDiscountHeaderfrm.get("isItemWiseDiscount").value ||
      this.viewMode
    )
      this.customerId.disable();
    else this.customerId.enable();
    return this.customerDiscountHeaderfrm.get("isItemWiseDiscount");
  }
  get discountpercent() {
    return this.customerDiscountHeaderfrm.get("discountPercentage");
  }

  get itemName() {
    return this.itemDiscountForm.get("itemName");
  }
  get operator() {
    return this.itemDiscountForm.get("operator");
  }
  get discountItemPercent() {
    return this.itemDiscountForm.get("discountPercentage");
  }
  constructor(
    private formBuilder: FormBuilder,
    public syncfusionHelperService: SyncfusionHelperService,
    private toastr: ToasterServiceService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private customerDiscountService: CustomerDiscountService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerDiscountId = this.activatedRoute.snapshot.params.id;
    this.getCustomerList();
    this.operators = [{ operator: "Add" }, { operator: "Subtract" }];
    this.customerDiscountHeaderfrm = this.createCustomerDiscountForm();

    const url = this.router.url.split("/");
    if (_.includes(url, "view")) {
      this.viewMode = true;
      // this.editExternal.allowAdding = false;
      this.syncfusionHelperService.editInline.allowAdding = false;
      this.syncfusionHelperService.editInline.allowDeleting = false;
      this.syncfusionHelperService.editInline.allowEditOnDblClick = false;
      this.syncfusionHelperService.editInline.allowEditing = false;
      this.discountpercent.disable();
      this.customerId.disable();
      this.isItemDiscount.disable();
      this.customerDiscountHeaderfrm.controls["isActive"].disable();
    } else {
      // this.editExternal.allowAdding = false;
      this.syncfusionHelperService.editInline.allowAdding = true;
      this.syncfusionHelperService.editInline.allowDeleting = true;
      this.syncfusionHelperService.editInline.allowEditOnDblClick = true;
      this.syncfusionHelperService.editInline.allowEditing = true;
    }
  }

  setToolbar() {
    const url = this.router.url.split("/");
    if (_.includes(url, "view"))
      this.grid.toolbarModule.enableItems(["uploadFile", "sampleFile"], false);
  }

  createCustomerDiscountForm(editData?) {
    return this.formBuilder.group({
      id: [editData ? editData.id : 0],

      discountCode: [
        { value: editData ? editData.discountCode : "", disabled: true },
      ],
      customerId: [editData ? editData.customerId : "", [Validators.required]],
      discountPercentage: [
        {
          value: editData ? editData.discountPercentage : "",
          disabled: this.viewMode,
        },
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      isActive: [
        {
          value: editData ? editData.isActive : true,
          disabled: this.viewMode,
        },
      ],

      isItemWiseDiscount: [
        {
          value: editData ? editData.isItemWiseDiscount : false,
          disabled: this.viewMode,
        },
      ],
    });
  }

  createItemDiscountForm(editData?) {
    return this.formBuilder.group({
      id: [editData ? editData.id : 0],

      itemName: [
        { value: editData ? editData.itemName : "", disabled: this.viewMode },
        [Validators.required],
      ],
      uomName: [
        {
          value: editData ? editData.uomName : "",
          disabled: this.viewMode,
        },
      ],
      price: [
        {
          value: editData ? editData.price : "",
          disabled: this.viewMode,
        },
      ],
      operator: [
        {
          value: editData ? editData.operator : "",
          disabled: this.viewMode,
        },
        [Validators.required],
      ],
      discountPercentage: [
        {
          value: editData ? editData.discountPercentage : "",
          disabled: this.viewMode,
        },
        [Validators.required],
      ],
      priceAfterDiscount: [
        {
          value: editData ? editData.priceAfterDiscount : "",
          disabled: this.viewMode,
        },
      ],
    });
  }

  getCustomerList() {
    let params = new HttpParams();
    params = params.append("saleTypeId", "0");
    params = params.append("customerStatus", "0");
    this.customerService.getAll(params).subscribe(
      (result) => {
        result = _.filter(result, ["activeStatus", 1]);
        this.allCustomerList = dropDownformatter(
          result,
          "code",
          "customerName"
        );
        this.getAllEntries();
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the customer list");
      }
    );
  }

  getAllEntries() {
    this.customerDiscountService.getAll().subscribe((resp) => {
      this.alreadyUsed = {
        names: resp.map((data: any) => data.customerId),
      };
      if (this.customerDiscountId) {
        this.customerDiscountService
          .getbyId(this.customerDiscountId)
          .subscribe((result) => {
            this.editingData = result;
            this.alreadyUsed.names.map((item) => {
              this.allCustomerList.map((data, i) => {
                if (data.id == item && data.id != this.editingData.customerId)
                  this.allCustomerList.splice(i, 1);
              });
            });
            this.customerList = _.cloneDeep(this.allCustomerList);
            this.getItemDiscountDetails(this.customerDiscountId);
          });
      } else {
        this.alreadyUsed.names.map((item) => {
          this.allCustomerList.map((data, i) => {
            if (data.id == item) this.allCustomerList.splice(i, 1);
          });
        });
        this.customerList = _.cloneDeep(this.allCustomerList);
      }
    });
  }

  getallCustomerItems() {
    this.customerDiscountService
      .getItems(this.customerId.value)
      .subscribe((resp) => {
        this.itemsList = resp;
        this.allItemList = _.cloneDeep(resp);
        // this.itemPriceDiscountList = [];
        this.selectedValues = [];
        // let tableData = _.cloneDeep(this.itemPriceList);
        this.itemPriceDiscountList.map((y) => {
          this.selectedValues.push(
            this.allItemList.find((x) => x.itemName == y.itemName)
          );
        });
        this.itemsList = _.difference(this.allItemList, this.selectedValues);
      });
  }

  getItemDiscountDetails(id) {
    this.customerDiscountService.getbyId(id).subscribe(
      (result: any) => {
        if (result) {
          this.customerDiscountHeaderfrm =
            this.createCustomerDiscountForm(result);
          this.itemPriceDiscountList = result.discountDetails;
        }
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the Item Discount List");
      }
    );
  }

  setUomandPrice(event) {
    this.itemDiscountForm.controls["uomName"].setValue(event.itemData.uomName);
    this.itemDiscountForm.controls["price"].setValue(event.itemData.price);
  }

  calculateDiscountPrice() {
    if (
      this.discountpercent.value &&
      this.itemDiscountForm?.controls["price"].value &&
      this.operator.value &&
      this.discountItemPercent.value
    ) {
      let calculatedDiscountPercentage =
        this.operator.value == "Add"
          ? this.discountpercent.value + this.discountItemPercent.value
          : this.discountpercent.value - this.discountItemPercent.value;
      let calculatedDiscount = 0;
      calculatedDiscount =
        this.itemDiscountForm.controls["price"].value -
        this.itemDiscountForm.controls["price"].value *
          (calculatedDiscountPercentage / 100);
      this.itemDiscountForm.controls["priceAfterDiscount"].setValue(
        calculatedDiscount
      );
      this.maxDiscountPercent =
        this.operator.value == "Add"
          ? 100 - this.discountpercent.value
          : this.discountpercent.value;
      this.discountItemPercent?.setValidators(
        Validators.max(this.maxDiscountPercent)
      );
    }
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === "add") {
      this.selectedIndex = "";
      this.submitClicked = false;
      this.itemDiscountForm = this.createItemDiscountForm(args.rowData);
    }
    if (args.requestType === "beginEdit") {
      this.submitClicked = false;
      let editData: any = args.rowData;
      this.itemsList.push(
        _.find(this.allItemList, ["itemId", editData.itemId])
      );
      this.itemDiscountForm = this.createItemDiscountForm(args.rowData);
    }
    if (args.requestType === "save") {
      this.submitClicked = true;
      // for removing duplicate items from fropdown
      this.selectedValues = [];
      let tableData = _.cloneDeep(this.itemPriceDiscountList);
      if (this.selectedIndex) {
        tableData.splice(this.selectedIndex, 1);
      }
      tableData.push(this.itemDiscountForm.getRawValue());
      tableData.map((y) => {
        this.selectedValues.push(
          this.allItemList.find((x) => x.itemName == y.itemName)
        );
      });
      this.itemsList = _.difference(this.allItemList, this.selectedValues);

      if (this.itemDiscountForm.valid) {
        let rowData = this.itemDiscountForm.getRawValue();
        let item = this.allItemList.find((x) => x.itemName == rowData.itemName);
        args.data["itemId"] = item.itemId;
        args.data["itemCode"] = item.itemCode;
        args.data["itemName"] = rowData["itemName"];
        args.data["operator"] = rowData["operator"];
        args.data["price"] = rowData["price"];
        args.data["priceAfterDiscount"] = rowData["priceAfterDiscount"];
        args.data["uomName"] = rowData["uomName"];
        args.data["id"] = rowData["id"];
        args.data["discountPercentage"] = rowData["discountPercentage"];
      } else {
        args.cancel = true;
      }
    }

    if (args.requestType === "delete") {
      args.cancel = true;
      this.onOpenDialogDelete(args.data);

      // const row: any = args;
      // const id = row.data[0] ? row.data[0].id : 0;
      // if (id) { }
    }
    if (args.requestType === "cancel") {
      this.selectedValues = [];
      // let tableData = _.cloneDeep(this.itemPriceList);
      this.itemPriceDiscountList.map((y) => {
        this.selectedValues.push(
          this.allItemList.find((x) => x.itemName == y.itemName)
        );
      });
      this.itemsList = _.difference(this.allItemList, this.selectedValues);
    }
  }

  public onOpenDialogDelete = function (data: any): void {
    const [{ id, itemCode, ...remainingData }, ...others] = data;
    this.DialogObj = DialogUtility.confirm({
      title: "Item",
      content: `Are you sure you want to delete Item Code<span style="color:red;font-weight:bold"> ${itemCode} </span>?`,
      okButton: { text: "OK", click: this.okClickDelete.bind(this, itemCode) },
      showCloseIcon: true,
      closeOnEscape: true,
      animationSettings: { effect: "Zoom" },
    });
  };

  okClickDelete(itemCode): void {
    this.itemPriceDiscountList.forEach((element, index) => {
      if (element["itemCode"] == itemCode) {
        this.itemPriceDiscountList.splice(index, 1);
        this.selectedValues = [];
        this.itemPriceDiscountList.map((y) => {
          this.selectedValues.push(
            this.allItemList.find((x) => x.itemName == y.itemName)
          );
        });
        this.itemsList = _.difference(this.allItemList, this.selectedValues);
      }
    });

    this.grid.refresh();

    this.DialogObj.hide();
    this.toastr.showSuccessMessage("Item deleted successfully");
  }

  rowSelected(event) {
    this.selectedIndex = event.row.getAttribute("aria-rowindex");
  }

  updateTableDiscounts() {
    this.itemPriceDiscountList.map((item: any) => {
      let calculatedDiscountPercentage =
        item.operator == "Add"
          ? this.discountpercent.value + item.discountPercentage
          : this.discountpercent.value - item.discountPercentage;
      let calculatedDiscount = 0;
      calculatedDiscount =
        item.price - item.price * (calculatedDiscountPercentage / 100);
      item.priceAfterDiscount = calculatedDiscount;
    });
    this.grid?.refresh();
  }

  saveData() {
    this.submitClicked = true;
    this.itemPriceDiscountList.map((item) => {
      item.id = item.id ? item.id : 0;
    });
    let payload = this.customerDiscountHeaderfrm.getRawValue();
    payload["discountDetails"] = this.itemPriceDiscountList.length
      ? this.itemPriceDiscountList
      : [];

    if (this.customerDiscountHeaderfrm.valid) {
      if (this.customerDiscountId) {
        this.customerDiscountService.update(payload).subscribe(
          (response: any) => {
            this.toastr.showSuccessMessage(
              "Customer Discount updated successfully!"
            );
            this.router.navigateByUrl("/masters/customerDiscount");
          },
          (error) => {
            this.toastr.showErrorMessage("Unable to update Customer Discount");
          }
        );
      } else {
        this.customerDiscountService.add(payload).subscribe(
          (response: any) => {
            this.toastr.showSuccessMessage(
              "Customer Discount added successfully!"
            );
            this.router.navigateByUrl("/masters/customerDiscount");
          },
          (error) => {
            this.toastr.showErrorMessage("Unable to add Customer Discount");
          }
        );
      }
    }
  }

  clickHandler(args: ClickEventArgs): void {
    if (args.item.id === "sampleFile") {
      let headerList = ["Item Code", "Operator(+/-)", "Discount %"];
      sampleExcelDownloader(headerList, "Customer Discount");
    }

    if (args.item.id === "uploadFile") {
      this.submitClicked = true;
      if (this.customerDiscountHeaderfrm.valid) {
        this.showDialog = true;
      } else {
        this.toastr.showWarningMessage("Please Fill Basic Details");
      }
    }
  }

  receiveParams(event) {
    this.showDialog = event;
  }

  uploadFileData(event) {
    var payload = [];
    event.map((item) => {
      payload.push({
        itemCode: item["Item Code"],
        operator: item["Operator(+/-)"],
        discountPercentage: item["Discount %"],
        customerId: this.customerId.value,
      });
    });
    this.customerDiscountService
      .validateExcelData(payload)
      .subscribe((resp) => {
        this.toastr.showSuccessMessage("File Uploaded Successfully");
        this.excelData = resp;
        this.gridFields = [
          { headerText: "Sl No.", width: "90" },
          { field: "systemRemarks", headerText: "System Remarks" },
          { field: "itemCode", headerText: "Item Code" },
          { field: "itemName", headerText: "Item Name" },
          { field: "uomName", headerText: "UOM" },
          { field: "operator", headerText: "Operator" },
          { field: "discountPercentage", headerText: "Discount %" },
          { field: "price", headerText: "Price" },
        ];
        this.showExcelValidation = true;
      });
  }

  updateExcelData(event) {
    if (event === "save") {
      this.itemPriceDiscountList = this.excelData;
      this.itemPriceDiscountList = _.uniqBy(
        this.itemPriceDiscountList,
        "itemId"
      );
      this.updateTableDiscounts();
    }
    this.showExcelValidation = false;
  }
}
