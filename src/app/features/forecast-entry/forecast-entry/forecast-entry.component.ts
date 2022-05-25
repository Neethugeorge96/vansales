import { ItemsService } from "./../../masters/items/items.service";
import { CustomerService } from "./../../masters/customer/customer.service";
import { ForecastEntryService } from "./../forecast-entry.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  GridComponent,
  ToolbarItems,
  SaveEventArgs,
  EditSettingsModel,
} from "@syncfusion/ej2-angular-grids";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";
import { SalesHistoryService } from "../../sales-history/sales-history.service";
import { ActivatedRoute, Router } from "@angular/router";
import { dropDownformatter } from "src/app/shared/utils/common.functions";
import { EmployeeService } from "../../masters/employee/employee.service";
import { RouteService } from "../../masters/route/route.service";
import { VanmasterService } from "../../masters/vanmaster/vanmaster.service";
import { HttpParams } from "@angular/common/http";
import * as _ from "lodash";

@Component({
  selector: "app-forecast-entry",
  templateUrl: "./forecast-entry.component.html",
})
export class ForecastEntryComponent implements OnInit {
  forecastFrm: FormGroup;
  forecastDetailsFrm: FormGroup;
  @ViewChild("grid", { static: true }) grid: GridComponent;
  showEmployeeClearBtn: boolean = false;
  submitClickedMain: boolean = false;
  submitClicked: boolean = false;
  maxDate: any;
  minDate: any;
  employeeList: any[];
  routeList: any[];
  vanList: any[];
  forecastEntryList: any[] = [];
  customerList: any[] = [];
  toolbarExternal: ToolbarItems[] = ["Search", "Add"];
  itemsList: any[] = [];
  uomList: any[] = [];
  forecastDetails: any[] = [];

  allCustomerLIst: any;

  get forecastDate() {
    return this.forecastFrm.get("forecastDate");
  }
  get entryDate() {
    return this.forecastFrm.get("entryDate");
  }
  get employeeId() {
    return this.forecastFrm.get("employeeId");
  }
  // get routeNo() {
  //   return this.forecastFrm.get("routeNo");
  // }
  // get vanNo() {
  //   return this.forecastFrm.get("vanNo");
  // }

  get customerId() {
    return this.forecastDetailsFrm.get("customerId");
  }
  get itemId() {
    return this.forecastDetailsFrm.get("itemId");
  }
  get uomMasterId() {
    return this.forecastDetailsFrm.get("uomName");
  }
  get quantity() {
    return this.forecastDetailsFrm.get("quantity");
  }
  get remarks() {
    return this.forecastDetailsFrm.get("remarks");
  }

  constructor(
    public formBuilder: FormBuilder,
    public toastSrv: ToasterServiceService,
    public syncfusionHelperService: SyncfusionHelperService,
    public activatedRoute: ActivatedRoute,
    private forecastService: ForecastEntryService,
    public employeeService: EmployeeService,
    public routeSrv: RouteService,
    public vanService: VanmasterService,
    private customerService: CustomerService,
    private itemsService: ItemsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllRoutes();
    this.getAllVan();
    this.getCustomerList();
  }

  editExternal: EditSettingsModel = {
    //showDeleteConfirmDialog: true,
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    mode: "Normal",

    allowEditOnDblClick: true,
  };

  getforcastEntryData(id) {
    this.forecastService.getbyId(id).subscribe(
      (resp: any) => {
        this.forecastFrm = this.createSearchForm(resp);
        this.forecastDetails = resp.forecastEntryDetails;
        this.forecastDetails.map((item) => {
          item.customerName = this.getCustomerName(item.customerId);
          item.itemName = this.getItemName(item.itemId);
          item.uomName = this.getUomName(item.uomMasterId);
        });
      },
      (error) => {
        this.toastSrv.showErrorMessage("Unable to fetch Van List");
      }
    );
  }

  createSearchForm(editData?) {
    return this.formBuilder.group({
      id: [editData ? editData.id : 0],
      forecastDate: [
        editData ? editData.forecastDate : "",
        Validators.required,
      ],
      entryDate: [editData ? editData.entryDate : "", Validators.required],
      employeeId: [editData ? editData.employeeId : "", Validators.required],
      // routeNo: [editData ? editData.routeNo : ''],
      // vanNo: [editData ? editData.vanNo : '']
    });
  }

  createForecastGridFrm(editData?) {
    return this.formBuilder.group({
      id: [editData ? editData.id : 0],
      customerId: [editData ? editData.customerId : "", Validators.required],
      itemId: [editData ? editData.itemId : "", Validators.required],

      uomName: [editData ? editData.uomName : "", Validators.required],
      quantity: [editData ? editData.quantity : "", Validators.required],
      remarks: [editData ? editData.remarks : ""],
    });
  }

  getAllEmployees() {
    this.forecastService.getAllEmployees().subscribe(
      (resp) => {
        resp = resp.filter((x) => x.isActive == true);
        this.employeeList = dropDownformatter(resp, "code", "employeeName");
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
      },
      (error) => {
        this.toastSrv.showErrorMessage("Unable to fetch Route List");
      }
    );
  }

  getAllVan() {
    this.vanService.getAll().subscribe(
      (resp) => {
        this.vanList = dropDownformatter(resp, "vanNumber", "vanModel");
      },
      (error) => {
        this.toastSrv.showErrorMessage("Unable to fetch Van List");
      }
    );
  }

  getCustomerList() {
    let params = new HttpParams();
    params = params.append("saleTypeId", "0");
    params = params.append("customerStatus", "0");
    this.customerService.getAll(params).subscribe(
      (result) => {
        this.allCustomerLIst = result;
        result = _.filter(result, ["activeStatus", 1]);
        this.customerList = result;
        this.getItemsList();
      },
      (error) => {
        console.error(error);
        this.toastSrv.showErrorMessage("Unable to fetch the customer list");
      }
    );
  }

  getItemsList() {
    this.itemsService.getAll().subscribe(
      (result) => {
        this.itemsList = result;
        this.getUom();
      },
      (error) => {
        console.error(error);
        this.toastSrv.showErrorMessage("Unable to fetch the items list");
      }
    );
  }

  selectUom(event) {
    let selectedItem = [event.itemData];
    let uom = this.uomList.find((x) => x.code == event.itemData.uom);
    this.forecastDetailsFrm.controls["uomName"].setValue(uom.code);
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === "add") {
      this.submitClickedMain = true;
      this.submitClicked = false;
      if (this.forecastFrm.valid)
        this.forecastDetailsFrm = this.createForecastGridFrm();
      else {
        this.toastSrv.showWarningMessage("Please fill basic details");
        args.cancel = true;
      }
    }
    if (args.requestType === "beginEdit") {
      this.submitClicked = false;
      const rowArgs: any = args.rowData;

      let uom = this.uomList.find((x) => x.id == args.rowData["uomMasterId"]);
      args.rowData["uomName"] = uom.code;
      this.forecastDetailsFrm = this.createForecastGridFrm(rowArgs);
    }
    if (args.requestType === "save") {
      this.submitClicked = true;
      if (this.forecastDetailsFrm.valid) {
        let rowData = this.forecastDetailsFrm.getRawValue();
        // console.log(args.rowData['forecastEntryHeaderId']);
        rowData.forecastEntryHeaderId = args.rowData["forecastEntryHeaderId"]
          ? args.rowData["forecastEntryHeaderId"]
          : 0;
        let uom = this.uomList.find((x) => x.code == rowData.uomName);
        args.data["customerName"] = this.getCustomerName(rowData.customerId);
        args.data["itemName"] = this.getItemName(rowData.itemId);
        args.data["uomMasterId"] = uom.id;
        args.data["customerId"] = rowData["customerId"];
        args.data["forecastEntryHeaderId"] = rowData["forecastEntryHeaderId"];
        args.data["id"] = rowData["id"];
        args.data["itemId"] = rowData["itemId"];
        args.data["quantity"] = rowData["quantity"];
        args.data["remarks"] = rowData["remarks"];
        args.data["uomName"] = rowData["uomName"];
      } else {
        args.cancel = true;
      }
    }
  }

  clearSearch() {
    this.grid.searchSettings.key = "";
    var that = this;
    setTimeout(function () {
      that.saveData();
    }, 100);
  }

  saveData() {
    let forecastHeaderData = this.forecastFrm.getRawValue();
    let forecastGridData = [];
    forecastGridData = this.grid.getCurrentViewRecords();
    this.submitClicked = true;
    this.submitClickedMain = true;
    forecastHeaderData["forecastEntryDetails"] = forecastGridData;

    // console.log(forecastHeaderData)
    if (this.forecastFrm.valid && forecastGridData.length) {
      if (this.activatedRoute.snapshot.params.id) {
        this.forecastService.update(forecastHeaderData).subscribe(
          (response: any) => {
            this.toastSrv.showSuccessMessage(
              "Forecast Entry details updated successfully!"
            );
            this.router.navigateByUrl("/forecast-entry");
          },
          (error) => {
            console.error("err", error);
            this.toastSrv.showErrorMessage(
              "Unable to update Forecast Entry details"
            );
          }
        );
      } else {
        this.forecastService.add(forecastHeaderData).subscribe(
          (response: any) => {
            this.toastSrv.showSuccessMessage(
              "Forecast Entry details added successfully!"
            );
            this.router.navigateByUrl("/forecast-entry");
          },
          (error) => {
            console.error("err", error);
            this.toastSrv.showErrorMessage(
              "Unable to add Forecast Entry details"
            );
          }
        );
      }
    }
  }

  getCustomerName(id) {
    if (id) {
      return this.allCustomerLIst.find((x) => x.id == id).customerName;
    }
  }

  getItemName(id) {
    if (id) {
      let item;
      item = this.itemsList.find((x) => x.id == id);
      return item.code + "-" + item.itemName;
    }
  }
  getUomName(id) {
    if (id) {
      return this.uomList.find((x) => x.id == id).code;
    }
  }

  getUom() {
    this.itemsService.getUom().subscribe((result) => {
      this.uomList = result;
      if (this.activatedRoute.snapshot.params.id) {
        this.getforcastEntryData(this.activatedRoute.snapshot.params.id);
      } else {
        this.forecastFrm = this.createSearchForm();
      }
    });
  }
}
