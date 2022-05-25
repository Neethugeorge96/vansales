import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToolbarItems } from "@syncfusion/ej2-angular-grids";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";
import { dropDownformatter } from "src/app/shared/utils/common.functions";
import { RouteService } from "../../masters/route/route.service";
import { VanmasterService } from "../../masters/vanmaster/vanmaster.service";
import * as moment from "moment";
import { StocktovanService } from "../stocktovan.service";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: "app-stocktovan-search",
  templateUrl: "./stocktovan-search.component.html",
})
export class StocktovanSearchComponent implements OnInit {
  searchForm: FormGroup;
  childGrid: any;
  toolbarExternal: ToolbarItems[] = ["Search"];
  submitClickedMain: boolean;
  showvanClearBtn: boolean = false;
  showRouteClearBtn: boolean = false;
  routeList: any[];
  vanList: any[];
  stocktovanlist: any[];
  maxDate: any = moment().toDate();
  minDate: any = moment().subtract(1, "month").toDate();

  public dataManager: any[] = [
    { Order: 100, ShipName: "Berlin", EmployeeID: 2 },
    { Order: 101, ShipName: "Capte", EmployeeID: 3 },
    { Order: 102, ShipName: "Marlon", EmployeeID: 4 },
    { Order: 103, ShipName: "Black pearl", EmployeeID: 5 },
    { Order: 104, ShipName: "Pearl", EmployeeID: 6 },
    { Order: 105, ShipName: "Noth bay", EmployeeID: 7 },
    { Order: 106, ShipName: "baratna", EmployeeID: 8 },
    { Order: 107, ShipName: "Charge", EmployeeID: 9 },
  ];

  get fromDate() {
    return this.searchForm.get("fromdate");
  }
  get toDate() {
    return this.searchForm.get("toDate");
  }
  get vanId() {
    return this.searchForm.get("vanId");
  }
  get routeId() {
    return this.searchForm.get("routeId");
  }

  constructor(
    private formBuilder: FormBuilder,
    public syncfusionHelperService: SyncfusionHelperService,
    private vanService: VanmasterService,
    private routeService: RouteService,
    private stocktovanService: StocktovanService
  ) {}

  ngOnInit(): void {
    this.getRoutes();
    this.getVanlist();
    this.searchForm = this.createSearchForm();
    this.searchData();
    this.childGrid = {
      dataSource: [],
      queryString: "stockInHeaderId",
      allowPaging: false,
      allowResizing: true,
      allowSorting: true,
      rowDataBound: this.rowDataBound.bind(this),
      rowHeight: this.syncfusionHelperService.height,
      columns: [
        {
          headerText: "S.No.",
          // textAlign: "Right",
          width: 120,
        },
        {
          field: "customerName",
          headerText: "Customer Name",
          width: 160,
        },
        {
          field: "lpoId",
          headerText: "LPO Id",
          width: 100,
        },
        {
          field: "itemCode",
          headerText: "Item Code",
          width: 110,
        },
        {
          field: "quantity",
          headerText: "Quantity",
          width: 100,
        },
        { field: "batchNumber", headerText: "Batch No." },
        {
          field: "productionDate",
          headerText: "Production Date",
          // type: "date",
          // format: "dd-MMM-yyyy",
        },
        {
          field: "expiryDate",
          headerText: "Expiry Date",
          // type: "date",
          // format: "dd-MMM-yyyy",
        },
        { field: "lotNumber", headerText: "Lot No." },
      ],
      queryCellInfo: (args) => {
        if (args.column.headerText == "Customer Name") {
          args.cell.innerHTML =
            (args.data.customerCode ? args.data.customerCode : "") +
            (args.data.customerCode || args.data.customerName ? "/" : "") +
            (args.data.customerName ? args.data.customerName : "");
        }
        if (args.column.headerText == "LPO Id") {
          args.cell.innerHTML = args.data.lpoId ? args.data.lpoId : "";
        }
      },
    };
  }

  createSearchForm() {
    return this.formBuilder.group({
      fromdate: [
        moment().subtract(30, "days").format("DD/MM/yyyy"),
        Validators.required,
      ],
      routeId: [""],
      toDate: [moment().format("DD/MM/yyyy"), Validators.required],
      vanId: [""],
    });
  }

  getRoutes() {
    let params = new HttpParams();
    params = params.append("customerId", "0");
    params = params.append("branchId", "0");

    this.routeService.getAll(params).subscribe((result) => {
      result = result.filter((x) => x.isActive == true);
      this.routeList = dropDownformatter(result, "routeNo", "routeName");
    });
  }

  getVanlist() {
    this.vanService.getAll().subscribe((result) => {
      this.vanList = dropDownformatter(result, "vanNumber", "vanModel");
    });
  }

  getchildgridData(args) {
    var rowData = args.data;
    this.stocktovanService.getbyId(rowData.id).subscribe((resp) => {
      args.childGrid.dataSource = resp;
      args.childGrid.refreshColumns();
      args.childGrid.refresh();
    });
  }

  searchData() {
    this.submitClickedMain = true;
    this.stocktovanService.getAll(this.searchForm.value).subscribe((resp) => {
      resp.map((data: any) => {
        data.stockInHeaderId = data.id;
      });
      this.stocktovanlist = resp;
    });
  }

  resetSearch() {
    // this.searchForm.reset({
    //   fromdate: moment().subtract(30, "days").format("DD/MM/yyyy"),
    //   toDate: moment().format("DD/MM/yyyy"),
    // });
    this.submitClickedMain = false;
    this.searchForm.reset();
    this.searchForm.markAsPristine();
    this.searchForm.markAsUntouched();
    this.stocktovanlist = [];
  }

  rowDataBound(args) {
    var rowIndex = parseInt(args.row.getAttribute("aria-rowIndex"));

    args.row.cells[0].innerText = rowIndex + 1;
  }
}
