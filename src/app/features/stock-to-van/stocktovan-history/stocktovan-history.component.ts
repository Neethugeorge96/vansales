import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { EmployeeService } from "../../masters/employee/employee.service";
import { StocktovanService } from "../stocktovan.service";
import { dropDownformatter } from "src/app/shared/utils/common.functions";
import * as moment from "moment";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";
import {
  ExcelExportProperties,
  GridComponent,
  ToolbarItems,
} from "@syncfusion/ej2-angular-grids";

@Component({
  selector: "app-stocktovan-history",
  templateUrl: "./stocktovan-history.component.html",
})
export class StocktovanHistoryComponent implements OnInit {
  @ViewChild("Grid", { static: true }) grid: GridComponent;
  searchForm: FormGroup;
  submitClicked: boolean = false;
  employeeList: any[];
  salesManList: any[];
  stockHistory: any[];
  count: number = 0;
  maxDate: any = moment().toDate();
  minDate: any = moment().subtract(1, "month").toDate();
  toolbarExternal: ToolbarItems[] = ["Search", "ExcelExport"];

  constructor(
    private formBuilder: FormBuilder,
    public employeeService: EmployeeService,
    public stocktoVanSrv: StocktovanService,
    public toast: ToasterServiceService,
    public syncfusionHelperService: SyncfusionHelperService
  ) {}

  get fromDate() {
    return this.searchForm.get("fromDate");
  }

  get toDate() {
    return this.searchForm.get("toDate");
  }

  get employeeId() {
    return this.searchForm.get("employeeId");
  }

  get salesManId() {
    return this.searchForm.get("salesManId");
  }

  ngOnInit(): void {
    this.searchForm = this.createSearchForm();
    this.getAllEmployees();
    this.getAllSalesman();
  }

  createSearchForm() {
    return this.formBuilder.group({
      fromDate: [
        moment().subtract(1, "month").format("DD/MM/yyyy"),
        [Validators.required],
      ],
      toDate: [moment().format("DD/MM/yyyy"), [Validators.required]],
      employeeId: [
        {
          value: JSON.parse(localStorage.getItem("employeeId")),
          disabled: true,
        },
      ],
      salesManId: ["", [Validators.required]],
    });
  }

  getAllEmployees() {
    this.employeeService.getAll().subscribe(
      (resp) => {
        this.employeeList = dropDownformatter(resp, "code", "employeeName");
      },
      (err) => {
        this.toast.showErrorMessage("Failed to load Employee List");
      }
    );
  }

  getAllSalesman() {
    this.stocktoVanSrv
      .getAllSalesMan(localStorage.getItem("employeeId"))
      .subscribe(
        (resp) => {
          this.salesManList = dropDownformatter(resp, "code", "employeeName");
        },
        (err) => {
          this.toast.showErrorMessage("Failed to load Salesman List");
        }
      );
  }

  searchData() {
    this.submitClicked = true;
    if (this.searchForm.valid) {
      this.stocktoVanSrv.getStockHistory(this.searchForm.value).subscribe(
        (resp) => {
          resp.map((data: any) => {
            data.balance =
              data.issuedQuantity - data.totalSale + data.goodReturnQty;
          });
          this.stockHistory = resp;
        },
        (err) => {
          this.toast.showErrorMessage("Failed to load stock history");
        }
      );
    }
  }

  resetSearch() {
    this.submitClicked = false;
    this.stockHistory = [];
    this.searchForm.reset();
  }

  clickHandler(args) {
    if (args.item.text == "Excel Export") {
      const excelExportProperties: ExcelExportProperties = {
        fileName: "stocktovanhistory.xlsx",
      };
      this.grid.excelExport(excelExportProperties);
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
}
