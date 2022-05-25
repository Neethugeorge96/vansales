import { HttpParams } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  CommandClickEventArgs,
  CommandModel,
  DetailRowService,
  EditSettingsModel,
  GridComponent,
  SaveEventArgs,
  ToolbarItems,
} from "@syncfusion/ej2-angular-grids";
import { DialogUtility } from "@syncfusion/ej2-angular-popups";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";
import { duplicateNameValidator } from "src/app/shared/utils/validators.functions";
import { ForecastEntryHeaderViewModel } from "../forcast-entry.model";
import { ForecastEntryService } from "../forecast-entry.service";
import * as moment from "moment";
import { EmployeeService } from "../../masters/employee/employee.service";
import { RouteService } from "../../masters/route/route.service";
import { VanmasterService } from "../../masters/vanmaster/vanmaster.service";
import { dropDownformatter } from "src/app/shared/utils/common.functions";

@Component({
  selector: "app-forcast-entry-list",
  templateUrl: "./forcast-entry-list.component.html",
})
export class ForcastEntryListComponent implements OnInit {
  @ViewChild("grid", { static: true }) grid: GridComponent;
  //  forcastEntryList: ForecastEntryHeaderViewModel[];
  public DialogObj;

  searchForm: FormGroup;

  showEmployeeClearBtn: boolean = false;
  showRouteNoClearBtn: boolean = false;
  showVanNOClearBtn: boolean = false;

  submitClickedMain: boolean = false;
  maxDate: any = moment().toDate();
  minDate: any = moment().subtract(1, "month").toDate();

  employeeList: any[];
  routeList: any[];
  vanList: any[];
  forecastEntryList: any[] = [];
  childGrid: any;

  get fromDate() {
    return this.searchForm.get("fromDate");
  }
  get toDate() {
    return this.searchForm.get("toDate");
  }
  get employeeId() {
    return this.searchForm.get("employeeId");
  }
  get routeNo() {
    return this.searchForm.get("routeNo");
  }
  get vanNo() {
    return this.searchForm.get("vanNo");
  }

  toolbarExternal: ToolbarItems[] = ["Search", "Add"];
  commands: CommandModel[] = [
    {
      type: "Delete",
      buttonOption: { cssClass: "e-flat", iconCss: "e-icons e-delete" },
    },
    {
      type: "Edit",
      buttonOption: { cssClass: "e-flat", iconCss: "e-icons e-edit" },
    },
  ];

  constructor(
    private toastr: ToasterServiceService,
    private formBuilder: FormBuilder,
    public syncfusionHelperService: SyncfusionHelperService,
    public forcastEntry: ForecastEntryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public employeeService: EmployeeService,
    public routeSrv: RouteService,
    public vanService: VanmasterService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.createSearchForm();
    this.getAllEmployees();
    this.getAllRoutes();
    this.getAllVan();

    this.childGrid = {
      dataSource: [],
      queryString: "forecastEntryHeaderId",
      allowPaging: false,
      allowResizing: true,
      allowSorting: true,
      rowHeight: this.syncfusionHelperService.height,
      columns: [
        {
          field: "customerName",
          headerText: "Customer Name",
          width: 120,
        },
        {
          field: "itemName",
          headerText: "Item Name",
          width: 90,
        },
        {
          field: "quantity",
          headerText: "Quantity",
          width: 100,
        },

        {
          field: "uomName",
          headerText: "UOM",
          width: 110,
        },

        {
          field: "remarks",
          headerText: "Remarks",
          width: 150,
        },
      ],
    };
    let fromMonth = moment().subtract(1, "month");
    this.fromDate.setValue(fromMonth.format("DD/MM/yyyy"));
    this.toDate.setValue(moment().format("DD/MM/yyyy"));

    this.getforcastEntryList();
  }

  createSearchForm() {
    return this.formBuilder.group({
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      employeeId: [""],
      routeNo: [""],
      vanNo: [""],
    });
  }

  getforcastEntryList() {
    let params = new HttpParams();
    params = params.append(
      "fromDate",
      moment(this.fromDate.value, "DD/MM/YYYY").format("MM/DD/YYYY")
    );
    params = params.append(
      "toDate",
      moment(this.toDate.value, "DD/MM/YYYY").format("MM/DD/YYYY")
    );
    params = params.append(
      "employeeId",
      this.searchForm.controls["employeeId"].value
        ? this.searchForm.controls["employeeId"].value
        : 0
    );
    params = params.append(
      "routeId",
      this.searchForm.controls["routeNo"].value
        ? this.searchForm.controls["routeNo"].value
        : 0
    );
    params = params.append(
      "vanId",
      this.searchForm.controls["vanNo"].value
        ? this.searchForm.controls["vanNo"].value
        : 0
    );

    this.forcastEntry.getAll(params).subscribe(
      (result) => {
        this.forecastEntryList = result;
        this.forecastEntryList.map((item) => {
          item.forecastEntryHeaderId = item.id;
        });
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the forcast Entry list");
      }
    );
  }

  getchildgridData(args) {
    var rowData = args.data;
    args.childGrid.dataSource = rowData.forecastEntryDetails;

    console.log(args.childGrid.dataSource);
    args.childGrid.refreshColumns();
    args.childGrid.refresh();
  }

  actionBegin(args: SaveEventArgs): void {
    const rowArgs: any = args.rowData;
    if (args.requestType === "add") {
      this.router.navigate(["./create"], { relativeTo: this.activatedRoute });
    }
    if (args.requestType === "beginEdit") {
      this.router.navigate(["./edit", rowArgs.id], {
        relativeTo: this.activatedRoute,
      });
    } else if (args.requestType === "delete") {
      args.cancel = true;
      this.onOpenDialogDelete(args.data);
    }
  }

  getAllEmployees() {
    this.employeeService.getAll().subscribe(
      (resp) => {
        resp = resp.filter((x) => x.isActive == true);
        this.employeeList = dropDownformatter(resp, "code", "employeeName");
      },
      (error) => {
        this.toastr.showErrorMessage("Unable to fetch Employee List");
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
      },
      (error) => {
        this.toastr.showErrorMessage("Unable to fetch Route List");
      }
    );
  }

  getAllVan() {
    this.vanService.getAll().subscribe(
      (resp) => {
        this.vanList = dropDownformatter(resp, "vanNumber", "vanModel");
      },
      (error) => {
        this.toastr.showErrorMessage("Unable to fetch Van List");
      }
    );
  }

  searchData() {
    this.submitClickedMain = true;
    if (this.searchForm.valid) {
      this.getforcastEntryList();
    }
  }

  resetSearch() {
    this.submitClickedMain = false;
    this.searchForm.reset();
    this.forecastEntryList = [];
  }

  public onOpenDialogDelete = function (data: any): void {
    const [{ id, ...remainingData }, ...others] = data;
    this.DialogObj = DialogUtility.confirm({
      title: "Forecast Entry List",
      content: `Are you sure you want to delete this Forecast Entry <span style="color:red;font-weight:bold">  </span>?`,
      okButton: { text: "OK", click: this.okClickDelete.bind(this, id) },
      showCloseIcon: true,
      closeOnEscape: true,
      animationSettings: { effect: "Zoom" },
    });
  };

  okClickDelete(id): void {
    this.forcastEntry.delete(id).subscribe(
      (res) => {
        if (res) {
          this.toastr.showSuccessMessage(
            "Forecast Entry List deleted successfully!"
          );
          this.DialogObj.hide();
          this.getforcastEntryList();
        }
      },
      (error) => {
        console.error("err", error);
        this.toastr.showErrorMessage(
          "Unable to delete the Forecast Entry  List"
        );
        this.DialogObj.hide();
      }
    );
  }
}
