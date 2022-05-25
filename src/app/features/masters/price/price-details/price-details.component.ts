import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  GridComponent,
  SaveEventArgs,
  SearchSettingsModel,
} from "@syncfusion/ej2-angular-grids";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";
import * as _ from "lodash";
import { ActivatedRoute, Router } from "@angular/router";
import { PriceService } from "../price.service";
import { ItemsService } from "../../items/items.service";
import { PriceListDetails } from "../price.model";
import { CustomerService } from "../../customer/customer.service";
import { DialogComponent, DialogUtility } from "@syncfusion/ej2-angular-popups";
import { ClickEventArgs } from "@syncfusion/ej2-navigations";
import { sampleExcelDownloader } from "src/app/shared/utils/common.functions";
import { ExcelSrvService } from "src/app/shared/excel-remarks/excel-srv.service";
import { Subscription } from "rxjs";
import * as moment from "moment";

@Component({
  selector: "app-price-details",
  templateUrl: "./price-details.component.html",
})
export class PriceDetailsComponent implements OnInit, OnDestroy {
  // @HostListener("window:popstate", ["$event"])
  // onPopState(event) {
  //   console.log("Back button pressed");
  // }
  @ViewChild("grid", { static: true }) grid: GridComponent;
  priceHeaderForm: FormGroup;
  itemPriceForm: FormGroup;
  private dataSub: Subscription;
  private validitySub: Subscription;
  private currentDataSub: Subscription;
  public searchOptions: SearchSettingsModel = {
    fields: ["itemName", "itemCode", "uomName", "price", "discountPrice"],
  };
  priceId: any;
  submitClicked: boolean;
  submitClickedMain: boolean;
  currencies: any[];
  viewMode: boolean = false;
  showDialog: boolean = false;
  itemsList: any[];
  allItemList: any[];
  uomList: any[];
  selectedValues: any = [];
  itemPriceList: PriceListDetails[] = [];
  selectedIndex: any;
  public DialogObj;
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

  get priceCode() {
    return this.priceHeaderForm.get("priceCode");
  }
  get priceListName() {
    return this.priceHeaderForm.get("priceListName");
  }
  get effectiveFrom() {
    return this.priceHeaderForm.get("effectiveFrom");
  }
  get effectiveTo() {
    return this.priceHeaderForm.get("effectiveTo");
  }
  get currencyId() {
    return this.priceHeaderForm.get("currencyId");
  }
  // get vatId() {
  //   return this.priceHeaderForm.get("vatId");
  // }
  get description() {
    return this.priceHeaderForm.get("description");
  }
  get discount() {
    return this.priceHeaderForm.get("discount");
  }

  get itemName() {
    return this.itemPriceForm.get("itemName");
  }

  // get itemCode() {
  //   return this.itemPriceForm.get("itemCode");
  // }
  get uomName() {
    return this.itemPriceForm.get("uomName");
  }
  get price() {
    return this.itemPriceForm.get("price");
  }

  get discountPrice() {
    return this.itemPriceForm.get("discountPrice");
  }

  alreadyUsed: { names: string[] } = { names: [] };
  alreadyUsedPrices: { names: string[] } = { names: [] };

  constructor(
    private formBuilder: FormBuilder,
    public syncfusionHelperService: SyncfusionHelperService,
    private toastr: ToasterServiceService,
    public activatedRoute: ActivatedRoute,
    public priceService: PriceService,
    private itemsService: ItemsService,
    private router: Router,
    private customerService: CustomerService,
    private excelSrv: ExcelSrvService
  ) {}

  ngOnInit(): void {
    this.getItemsList();
    this.getUom();
    this.getCurrencies();
    this.getAllPrices();

    const url = this.router.url.split("/");
    if (_.includes(url, "view")) {
      this.viewMode = true;
      // this.editExternal.allowAdding = false;
      this.syncfusionHelperService.editInline.allowAdding = false;
      this.syncfusionHelperService.editInline.allowDeleting = false;
      this.syncfusionHelperService.editInline.allowEditOnDblClick = false;
      this.syncfusionHelperService.editInline.allowEditing = false;
    } else {
      // this.editExternal.allowAdding = false;
      this.syncfusionHelperService.editInline.allowAdding = true;
      this.syncfusionHelperService.editInline.allowDeleting = true;
      this.syncfusionHelperService.editInline.allowEditOnDblClick = true;
      this.syncfusionHelperService.editInline.allowEditing = true;
    }
  }
  createPriceHeaderForm(editData?) {
    return this.formBuilder.group({
      id: [editData ? editData.id : 0],
      // priceCode: [editData ? editData.priceCode : '', ],
      // priceListName: [editData ? editData.priceListName : '', [Validators.required]],
      priceCode: [
        { value: editData ? editData.priceCode : "", disabled: true },
      ],
      priceListName: [
        {
          value: editData ? editData.priceListName : "",
          disabled: this.viewMode,
        },
        [Validators.required],
      ],
      effectiveFrom: [
        {
          value: editData ? editData.effectiveFrom : "",
          disabled: this.viewMode,
        },
        [Validators.required],
      ],
      effectiveTo: [
        {
          value: editData ? editData.effectiveTo : "",
          disabled: this.viewMode,
        },
        [Validators.required],
      ],
      currencyId: [
        { value: editData ? editData.currencyId : "", disabled: this.viewMode },
        [Validators.required],
      ],
      description: [
        {
          value: editData ? editData.description : "",
          disabled: this.viewMode,
        },
        [Validators.maxLength(256)],
      ],
      discount: [
        { value: editData ? editData.discount : 0, disabled: this.viewMode },
        [Validators.required, Validators.max(100)],
      ],
      isActive: [
        {
          value: editData ? editData.isActive : true,
          disabled: this.viewMode,
        },
        [Validators.required],
      ],
    });
  }

  createPriceGridForm(editData?) {
    return this.formBuilder.group({
      priceListMasterId: [editData ? editData.priceListMasterId : 0],
      // itemCode: [editData ? editData.itemCode : "", []],

      itemName: [editData ? editData.itemId : "", [Validators.required]],
      uomName: [editData ? editData.uomName : "", []],
      price: [
        editData ? editData.price : "",
        [Validators.required, Validators.max(999999999), Validators.min(1)],
      ],
      discountPrice: [editData ? editData.discountPrice : ""],
    });
  }

  getItemsList() {
    this.itemsService.getAll().subscribe((result) => {
      this.itemsList = result;
      this.allItemList = _.cloneDeep(result);
      this.alreadyUsed = {
        names: result.map((data) => data["itemName"]),
      };
      this.priceId = this.activatedRoute.snapshot.params.id;
      if (this.priceId) {
        this.getPriceDetails(this.priceId);
      } else {
        this.priceHeaderForm = this.createPriceHeaderForm();
        this.excelSrv.currentDetails.subscribe((resp) => {
          if (resp) {
            this.priceHeaderForm = this.createPriceHeaderForm(resp);
            this.itemPriceList = resp.priceListDetails;
            this.validitySub = this.excelSrv.excelValidated.subscribe(
              (valid) => {
                if (valid) {
                  this.dataSub = this.excelSrv.data.subscribe((response) => {
                    if (response) {
                      response.map((item) => {
                        this.itemPriceList.push(item);
                      });
                      this.itemPriceList = _.uniqBy(
                        this.itemPriceList,
                        "itemId"
                      );
                      this.selectedValues = [];
                      this.itemPriceList.map((y) => {
                        this.selectedValues.push(
                          this.allItemList.find((x) => x.id == y.itemId)
                        );
                      });
                      this.itemsList = _.difference(
                        this.allItemList,
                        this.selectedValues
                      );
                    }
                  });
                }
              }
            );
          }
        });
      }
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the items list");
      };
    });
  }

  getUom() {
    this.itemsService.getUom().subscribe((result) => {
      this.uomList = result;
    });
  }

  getCurrencies() {
    this.customerService.getCurrencies().subscribe(
      (result) => {
        this.currencies = result;
      },
      (error) => {
        this.toastr.showErrorMessage("Unable to fetch currencies");
      }
    );
  }

  getAllPrices() {
    this.priceService.getAll().subscribe((result) => {
      this.alreadyUsedPrices = {
        names: result.map((data) => data["priceListName"]),
      };
    });
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === "add") {
      this.submitClicked = false;
      this.submitClickedMain = true;
      this.selectedIndex = "";
      if (this.priceHeaderForm.valid) {
        const rowArgs: any = args.rowData;
        this.itemPriceForm = this.createPriceGridForm(args.rowData);
      } else {
        this.toastr.showWarningMessage("Please fill basic details");
        args.cancel = true;
      }
    }
    if (args.requestType === "beginEdit") {
      this.submitClicked = false;
      let editingData: any = args.rowData;
      this.itemsList.push(_.find(this.allItemList, ["id", editingData.itemId]));
      this.itemPriceForm = this.createPriceGridForm(args.rowData);
    }
    if (args.requestType === "save") {
      this.submitClicked = true;
      if (this.itemPriceForm.valid) {
        this.selectedValues = [];
        let tableData = _.cloneDeep(this.itemPriceList);
        if (this.selectedIndex) {
          tableData.splice(this.selectedIndex, 1);
        }
        tableData.push(this.itemPriceForm.getRawValue());
        tableData.map((y) => {
          if (y.itemId)
            this.selectedValues.push(
              this.allItemList.find((x) => x.id == y.itemId)
            );
          else
            this.selectedValues.push(
              this.allItemList.find((x) => x.id == y.itemName)
            );
        });
        this.itemsList = _.difference(this.allItemList, this.selectedValues);
        // if(this.itemPriceForm.valid){
        let rowData = this.itemPriceForm.getRawValue();
        let item = this.allItemList.find((x) => x.id == rowData.itemName);
        let uom = this.uomList.find((x) => x.code == rowData.uomName);
        // rowData["uomName"] = uom.name;
        args.data["itemCode"] = item.code;
        args.data["itemId"] = item.id;
        args.data["uomMasterId"] = uom.id;
        args.data["uomName"] = rowData["uomName"];
        if (!rowData.priceListMasterId) {
          rowData.priceListMasterId = 0;
        }
        args.data["itemName"] = item.itemName;
        args.data["price"] = rowData["price"];
        args.data["discountPrice"] = rowData["discountPrice"];
        args.data["modifiedDate"] = moment().toISOString();
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
    //let data = this.grid.getCurrentViewRecords();
    this.itemPriceList.forEach((element, index) => {
      // console.log("element", element)
      if (element["itemCode"] == itemCode) {
        this.itemPriceList.splice(index, 1);
        this.selectedValues = [];
        // let tableData = _.cloneDeep(this.itemPriceList);
        this.itemPriceList.map((y) => {
          this.selectedValues.push(
            this.allItemList.find((x) => x.id == y.itemId)
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
    //args.row.getAttribute('aria-rowindex')

    this.selectedIndex = event.row.getAttribute("aria-rowindex");
  }

  receiveParams(event) {
    this.showDialog = event;
  }

  clickHandler(args: ClickEventArgs): void {
    if (args.item.id === "sampleFile") {
      let headerList = ["Item Code", "Price"];
      sampleExcelDownloader(headerList, "Price");
    }

    if (args.item.id === "uploadFile") {
      this.submitClicked = false;
      this.submitClickedMain = true;
      if (this.priceHeaderForm.valid) {
        this.showDialog = true;
      } else {
        this.toastr.showWarningMessage("Please Fill Basic Details");
      }
    }
  }

  uploadFileData(event) {
    var payload = [];
    event.map((item) => {
      payload.push({
        itemCode: item["Item Code"],
        price: item["Price"],
        discountPrice: (item["Price"] * this.discount.value) / 100,
      });
    });
    this.priceService.validateExcel(payload).subscribe((response) => {
      this.toastr.showSuccessMessage("File Uploaded Successfully");
      this.excelSrv.updateData(response);
      var gridFields = [
        { headerText: "Sl No.", width: "90" },
        { field: "systemRemarks", headerText: "System Remarks" },
        { field: "itemCode", headerText: "Item Code" },
        { field: "itemName", headerText: "Item Name" },
        { field: "uomName", headerText: "UOM" },
        { field: "price", headerText: "Price" },
        { field: "discountPrice", headerText: "Discount Price" },
      ];
      this.excelSrv.updateGridfields(gridFields);
      let currentRecord = this.priceHeaderForm.getRawValue();
      currentRecord["priceListDetails"] = this.grid.getCurrentViewRecords();
      currentRecord["Route"] = currentRecord.id
        ? `masters/priceListmaster/edit/${currentRecord.id}`
        : "masters/priceListmaster/create";
      this.excelSrv.updateCurrentRecord(currentRecord);
      this.router.navigateByUrl("excel-remarks");
    });
  }

  clearSearch() {
    this.grid.searchSettings.key = "";
    var that = this;
    setTimeout(function () {
      that.saveData();
    }, 100);
  }

  saveData() {
    let priceHeaderData = this.priceHeaderForm.getRawValue();
    let priceGridData = [];
    priceGridData = this.grid.getCurrentViewRecords();
    this.submitClicked = true;
    this.submitClickedMain = true;

    priceHeaderData["priceListDetails"] = priceGridData;

    if (this.priceHeaderForm.valid && priceGridData.length) {
      if (this.priceId) {
        this.priceService.update(priceHeaderData).subscribe(
          (response: any) => {
            this.toastr.showSuccessMessage("Price List updated successfully!");
            this.excelSrv.updateData(null);
            this.excelSrv.updateExcelValidity(false);
            this.excelSrv.updateGridfields(null);
            this.excelSrv.updateCurrentRecord(null);
            this.router.navigateByUrl("/masters/priceListmaster");
          },
          (error) => {
            console.error("err", error);
            this.toastr.showErrorMessage("Unable to update Price List");
          }
        );
      } else {
        this.priceService.add(priceHeaderData).subscribe(
          (response: any) => {
            this.toastr.showSuccessMessage("Price List added successfully!");
            this.excelSrv.updateData(null);
            this.excelSrv.updateExcelValidity(false);
            this.excelSrv.updateGridfields(null);
            this.excelSrv.updateCurrentRecord(null);
            this.router.navigateByUrl("/masters/priceListmaster");
          },
          (error) => {
            console.error("err", error);
            this.toastr.showErrorMessage("Unable to add Price List");
          }
        );
      }
    }
    if (!priceGridData.length)
      this.toastr.showWarningMessage("Please select atleast one item");
  }

  getPriceDetails(id) {
    this.priceService.getbyId(id).subscribe(
      (result: any) => {
        if (result) {
          this.priceHeaderForm = this.createPriceHeaderForm(result);
          this.itemPriceList = result.priceListDetails;

          this.selectedValues = [];
          // let tableData = _.cloneDeep(this.itemPriceList);
          this.itemPriceList.map((y) => {
            this.selectedValues.push(
              this.allItemList.find((x) => x.id == y.itemId)
            );
          });
          this.itemsList = _.difference(this.allItemList, this.selectedValues);

          this.currentDataSub = this.excelSrv.currentDetails.subscribe(
            (resp) => {
              if (resp) {
                this.priceHeaderForm = this.createPriceHeaderForm(resp);
                this.itemPriceList = resp.priceListDetails;
              }
              this.validitySub = this.excelSrv.excelValidated.subscribe(
                (valid) => {
                  if (valid) {
                    this.dataSub = this.excelSrv.data.subscribe((response) => {
                      if (response) {
                        response.map((item) => {
                          this.itemPriceList.push(item);
                        });
                        this.itemPriceList = _.uniqBy(
                          this.itemPriceList,
                          "itemId"
                        );
                        this.selectedValues = [];
                        this.itemPriceList.map((y) => {
                          this.selectedValues.push(
                            this.allItemList.find((x) => x.id == y.itemId)
                          );
                        });
                        this.itemsList = _.difference(
                          this.allItemList,
                          this.selectedValues
                        );
                      }
                    });
                  }
                }
              );
            }
          );
        }
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the Price List");
      }
    );
  }

  selectUom(event) {
    let selectedItem = [event.itemData];
    let uom = this.uomList.find((x) => x.code == event.itemData.uom);
    this.itemPriceForm.controls["uomName"].setValue(uom.code);
  }

  setDuplicate() {
    this.alreadyUsedPrices.names.map((x) => {
      if (x.toLowerCase() == this.priceListName.value.toLowerCase()) {
        this.priceHeaderForm.controls["priceListName"].setErrors({
          duplicate: true,
        });
      }
    });
  }

  clearValues() {
    this.excelSrv.updateData(null);
    this.excelSrv.updateExcelValidity(false);
    this.excelSrv.updateGridfields(null);
    this.excelSrv.updateCurrentRecord(null);
  }

  setToolbar() {
    const url = this.router.url.split("/");
    if (_.includes(url, "view"))
      this.grid.toolbarModule.enableItems(["uploadFile", "sampleFile"], false);
  }

  calculatePrices() {
    if (
      (this.discount.value || this.discount.value == 0) &&
      this.itemPriceForm?.controls["price"].value
    ) {
      this.itemPriceForm.controls["discountPrice"].setValue(
        (this.itemPriceForm.controls["price"].value * this.discount.value) / 100
      );
    }
  }

  updateTablePrices() {
    this.itemPriceList.map((item) => {
      item.discountPrice = (item.price * this.discount.value) / 100;
    });
    this.grid.refresh();
  }

  ngOnDestroy() {
    if (this.dataSub) this.dataSub.unsubscribe();
    if (this.validitySub) this.validitySub.unsubscribe();
    if (this.currentDataSub) this.currentDataSub.unsubscribe();
  }
}
