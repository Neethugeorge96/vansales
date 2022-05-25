import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import * as moment from "moment";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { SaleType } from "src/app/models/common/types/sale-type.enum";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";
import * as _ from "lodash";
import {
  dropDownformatter,
  enumSelector,
  sampleExcelDownloader,
} from "src/app/shared/utils/common.functions";
import { CustomerService } from "../../masters/customer/customer.service";
import { EmployeeService } from "../../masters/employee/employee.service";
import { RouteService } from "../../masters/route/route.service";
import { SalesHistoryService } from "../sales-history.service";
import { Types } from "./sales-history.model";
import { HttpParams } from "@angular/common/http";

import {
  ExcelExportProperties,
  GridComponent,
  ToolbarItems,
} from "@syncfusion/ej2-angular-grids";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: "app-sales-history",
  templateUrl: "./sales-history.component.html",
})
export class SalesHistoryComponent implements OnInit {
  @ViewChild("Grid", { static: false }) public grid: GridComponent;
  @ViewChild("Grid2", { static: false }) public grid2: GridComponent;
  searchForm: FormGroup;
  showCustomerClearBtn: boolean = false;
  showRouteClearBtn: boolean = false;
  showEmployeeClearBtn: boolean = false;
  submitClickedMain: boolean = false;
  formSubmitted: boolean = false;
  isSales: boolean = false;
  childgridData: any = [];
  count: number = 0;
  initialRender: boolean = true;

  customerList: any[];
  employeeList: any[];
  routeList: any[];
  salesHistoryList: any[] = [];
  childGrid: any;
  childGridData: any = [];
  returnHistoryList: any[] = [];
  returnChildGrid: any;
  toolbarExternal: ToolbarItems[] | object = [
    "Search",
    "ExcelExport",
    {
      text: "Export Header",

      tooltipText: "Export Header",

      prefixIcon: "e-export-excel",

      id: "Update",
    },
  ];
  public excelcolumn: object[] = [];
  public excelDatasource: object[] = [];
  saleTypes = SaleType;
  typeList = enumSelector(Types);

  maxDate: any = moment().toDate();
  minDate: any = moment().subtract(1, "month").toDate();

  get fromDate() {
    return this.searchForm.get("fromDate");
  }
  get toDate() {
    return this.searchForm.get("toDate");
  }
  get customerId() {
    return this.searchForm.get("customerId");
  }
  get routeId() {
    return this.searchForm.get("routeId");
  }
  get employeeId() {
    return this.searchForm.get("employeeId");
  }
  get type() {
    return this.searchForm.get("type");
  }

  constructor(
    public formBuilder: FormBuilder,
    public customerService: CustomerService,
    public employeeService: EmployeeService,
    public routeSrv: RouteService,
    public toastSrv: ToasterServiceService,
    public syncfusionHelperService: SyncfusionHelperService,
    public salesHistorySrv: SalesHistoryService,
    private loaderService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.getAllCustomers();
    this.searchForm = this.createSearchForm();

    this.childGrid = {
      dataSource: [],
      queryString: "salesHeaderId",
      allowPaging: false,
      allowResizing: true,
      allowSorting: true,
      rowHeight: this.syncfusionHelperService.height,
      columns: [
        {
          field: "index",
          headerText: "S.No.",
          width: 68,
        },
        {
          field: "itemCode",
          headerText: "Item Code",
          width: 130,
        },
        {
          field: "itemName",
          headerText: "Item Name",
          width: 163,
        },
        {
          field: "lpoId",
          headerText: "LPO Id",
          width: 75,
        },
        {
          field: "quantity",
          headerText: "Qty.",
          width: 60,
        },
        {
          field: "unitPrice",
          headerText: "Unit Price",
          width: 105,
        },
        { field: "discountPercentage", headerText: "Discount %", width: 115 },
        {
          field: "discountedPrice",
          headerText: "Discounted Price",
          width: 160,
        },
        { field: "vatPercentage", headerText: "VAT %", width: 78 },
        {
          field: "taxableAmount",
          headerText: "Taxable Amt",
          width: 130,
        },
        {
          field: "taxAmount",
          headerText: "Tax Amt",
          width: 95,
        },
        {
          field: "lineTotal",
          headerText: "Line Total",
          width: 105,
        },
        // { field: "lotNumber", headerText: "Lot No.", width: 80 },
      ],
      queryCellInfo: (args) => {
        if (args.column.headerText == "LPO Id") {
          args.cell.innerHTML =
            args.data.lpoId !== "null" ? args.data.lpoId : "";
        }
      },
    };

    this.returnChildGrid = {
      dataSource: [],
      queryString: "salesReturnHeaderId",
      allowPaging: false,
      allowResizing: true,
      allowSorting: true,
      rowHeight: this.syncfusionHelperService.height,
      columns: [
        {
          field: "index",
          headerText: "S.No.",
          width: 68,
        },
        {
          field: "itemCode",
          headerText: "Item Code",
          width: 150,
        },
        {
          field: "itemName",
          headerText: "Item Name",
          width: 155,
        },
        {
          field: "salesInvoiceNo",
          headerText: "Sales Invoice No.",
          width: 160,
        },
        {
          field: "reasonCode",
          headerText: "Reason Code",
          width: 130,
        },
        {
          field: "quantity",
          headerText: "Qty.",
          width: 60,
        },
        {
          field: "unitPrice",
          headerText: "Unit Price",
          width: 120,
        },
        {
          field: "discountPercentage",
          headerText: "Discount %",
          width: 120,
        },
        {
          field: "discountedPrice",
          headerText: "Discounted Price",
          width: 160,
        },
        { field: "vatPercentage", headerText: "VAT %", width: 77 },
        {
          field: "taxableAmount",
          headerText: "Taxable Amt",
          width: 128,
        },
        {
          field: "taxAmount",
          headerText: "Tax Amt",
          width: 95,
        },
        {
          field: "lineTotal",
          headerText: "Line Total",
          width: 103,
        },
      ],
    };

    let fromMonth = moment().subtract(1, "month");
    this.fromDate.setValue(fromMonth.format("DD/MM/yyyy"));
    this.toDate.setValue(moment().format("DD/MM/yyyy"));
  }

  getAllCustomers() {
    let params = new HttpParams();
    params = params.append("saleTypeId", "0");
    params = params.append("customerStatus", "0");
    this.customerService.getAll(params).subscribe(
      (resp) => {
        resp = _.filter(resp, ["activeStatus", 1]);

        this.customerList = dropDownformatter(resp, "code", "customerName");
        this.getAllEmployees();
      },
      (error) => {
        this.toastSrv.showErrorMessage("Unable to fetch Customer List");
      }
    );
  }

  getAllEmployees() {
    this.employeeService.getAll().subscribe(
      (resp) => {
        resp = resp.filter((x) => x.isActive == true);
        this.employeeList = dropDownformatter(resp, "code", "employeeName");
        this.getAllRoutes();
      },
      (error) => {
        this.toastSrv.showErrorMessage("Unable to fetch Employee List");
      }
    );
  }

  getAllRoutes() {
    let params = new HttpParams();
    params = params.append("customerId", "0");
    params = params.append("branchId", "0");
    this.routeSrv.getAll(params).subscribe(
      (resp) => {
        resp = resp.filter((x) => x.isActive == true);
        this.routeList = dropDownformatter(resp, "routeNo", "routeName");
        var that = this;
        setTimeout(function () {
          that.searchData();
        }, 500);
      },
      (error) => {
        this.toastSrv.showErrorMessage("Unable to fetch Route List");
      }
    );
  }

  createSearchForm() {
    return this.formBuilder.group({
      fromDate: ["", Validators.required],
      routeId: [""],
      toDate: ["", Validators.required],
      customerId: [""],
      employeeId: [""],
      type: [1, Validators.required],
    });
  }

  searchData() {
    this.submitClickedMain = true;
    if (this.searchForm.valid) {
      this.formSubmitted = true;
      this.loaderService.start();
      this.salesHistorySrv.getAll(this.searchForm.value).subscribe(
        (resp: any) => {
          this.loaderService.stop();
          if (resp[0].sales) {
            this.childgridData = [];
            resp[0].sales.map((data: any) => {
              data.salesHeaderId = data.id;
            });

            this.salesHistoryList = resp[0].sales;
            this.returnHistoryList = [];
            this.isSales = true;
            this.childGridData = [];
            this.salesHistoryList.map((data) => {
              data.saleTypeId = this.saleTypes[data.saleTypeId];

              data.totalTaxableAmount = data.totalTaxableAmount.toFixed(2);
              data.totalTaxAmount = data.totalTaxAmount.toFixed(2);
              data.totalPrice = data.totalPrice.toFixed(2);

              data.salesDetails.map((item, i) => {
                item.index = i + 1;
                this.childGridData.push(item);
              });
            });
            var grid1: any = document.getElementById("Grid");
            if (grid1) {
              grid1.ej2_instances[0].childGrid.dataSource = this.childGridData;
              // grid1.refresh();
            }
          } else {
            resp[0].salesReturn.map((data: any) => {
              data.salesReturnHeaderId = data.id;
            });

            this.returnHistoryList = resp[0].salesReturn;
            this.salesHistoryList = [];
            this.isSales = false;
            this.childGridData = [];
            this.returnHistoryList.map((data) => {
              data.totalTaxableAmount = -1 * data.totalTaxableAmount;
              data.totalTaxableAmount = data.totalTaxableAmount.toFixed(2);

              data.totalTaxAmount = -1 * data.totalTaxAmount;
              data.totalTaxAmount = data.totalTaxAmount.toFixed(2);

              data.totalAmount = data.totalAmount.toFixed(2);
              data.totalAmount = -1 * data.totalAmount;

              data.saleTypeId = this.saleTypes[data.saleTypeId];
              data.salesReturnDetails.map((item, i) => {
                item.index = i + 1;
                this.childGridData.push(item);
              });
            });
            var grid2: any = document.getElementById("Grid2");
            if (grid2) {
              grid2.ej2_instances[0].childGrid.dataSource = this.childGridData;
            }
          }
        },
        (err) => {
          this.toastSrv.showErrorMessage("Unable to fetch Sales History");
        }
      );
    }
  }

  resetSearch() {
    this.submitClickedMain = false;
    this.formSubmitted = false;
    this.searchForm.reset();
    // this.searchForm.controls.customerId.setValue(null)
    this.searchForm.markAsPristine();
    this.searchForm.markAsUntouched();

    this.salesHistoryList = [];
    this.returnHistoryList = [];
  }

  getchildgridData(args) {
    var rowData = args.data;
    args.childGrid.dataSource = rowData.salesDetails
      ? rowData.salesDetails
      : rowData.salesReturnDetails;
    console.log("sales", rowData.salesDetails);

    args.childGrid.refreshColumns();
    args.childGrid.refresh();
  }

  clickHandler(args) {
    if (args.item.text == "Excel Export") {
      this.loaderService.start();
      const excelExportProperties: ExcelExportProperties = {
        fileName: "salesHistory.xlsx",
        hierarchyExportMode: "All",
      };
      this.grid
        ? this.grid.excelExport(excelExportProperties)
        : this.grid2.excelExport(excelExportProperties);
      this.loaderService.stop();
    }

    if (args.item.text == "Export Header") {
      // this.excelcolumn = [{ field: "invoiceNo" }, { field: "customerCode" }];
      // this.excelDatasource = [];
      // this.salesHistoryList.map((item) => {
      //   this.excelDatasource.push({
      //     invoiceNo: item.invoiceNo,
      //     customerCode: item.customerCode,
      //   });
      // });
      const exportProperties: ExcelExportProperties = {
        // dataSource: this.excelDatasource,
        // columns: this.excelcolumn,
        fileName: "Sales History Header.xlsx",
        hierarchyExportMode: "None",
      };
      this.grid
        ? this.grid.excelExport(exportProperties)
        : this.grid2.excelExport(exportProperties);
    }
  }

  excelQueryCellInfo(args) {
    if (args.column.headerText == "S.No.") {
      args.value = ++this.count;
    }
  }
  excelexportcomplete() {
    this.count = 0;
  }

  load(grid) {
    grid.childGrid.dataSource = this.childGridData;
    grid.localeObj.currentLocale.Search = "";
  }

  loadGrid2(grid) {
    grid.childGrid.dataSource = this.childGridData;
    grid.localeObj.currentLocale.Search = "";
  }
}
