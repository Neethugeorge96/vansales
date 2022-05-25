import { HttpParams } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  CommandClickEventArgs,
  GridComponent,
  SaveEventArgs,
} from "@syncfusion/ej2-angular-grids";
import { DialogUtility } from "@syncfusion/ej2-angular-popups";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";
import { dropDownformatter } from "src/app/shared/utils/common.functions";
import { CustomerService } from "../../customer/customer.service";
import { UserService } from "../../user/user.service";
import { routeMaster } from "../route.model";
import { RouteService } from "../route.service";

@Component({
  selector: "app-route",
  templateUrl: "./route.component.html",
})
export class RouteComponent implements OnInit {
  @ViewChild("grid", { static: true }) grid: GridComponent;
  routeList: routeMaster[];
  public DialogObj;
  customerList: any[] = [];
  branchList: any[];
  searchForm: FormGroup;
  showCustomerClearBtn: boolean = false;
  showRouteClearBtn: boolean = false;

  constructor(
    private toastr: ToasterServiceService,
    public syncfusionHelperService: SyncfusionHelperService,
    private routeService: RouteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    public toastSrv: ToasterServiceService,
    private formBuilder: FormBuilder,
    private userservice: UserService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.createSearchForm();
    this.getRouteList();
    this.getCustomerList();
    this.getBranchList();
  }

  getCustomerList() {
    let params = new HttpParams();
    params = params.append("saleTypeId", "0");
    params = params.append("customerStatus", "0");
    this.customerService.getAll(params).subscribe(
      (result) => {
        this.customerList = result;
        this.customerList = dropDownformatter(
          this.customerList,
          "code",
          "customerName"
        );
      },
      (error) => {
        console.error(error);
        this.toastSrv.showErrorMessage("Unable to fetch the customer list");
      }
    );
  }
  getRouteList() {
    let params = new HttpParams();
    params = params.append(
      "customerId",
      this.searchForm.controls["customerId"].value
        ? this.searchForm.controls["customerId"].value
        : 0
    );
    params = params.append(
      "branchId",
      this.searchForm.controls["branchId"].value
        ? this.searchForm.controls["branchId"].value
        : 0
    );

    this.routeService.getAll(params).subscribe(
      (result) => {
        this.routeList = result;
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the route list");
      }
    );
  }

  getBranchList() {
    this.userservice.getBranches().subscribe(
      (result) => {
        this.branchList = result;
        // this.routeHeaderForm.patchValue({
        //   branchId: this.routeData ? parseInt(this.routeData.branchId) : "",
        // });
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the branch list");
      }
    );
  }

  get getCustomer() {
    return this.searchForm.get("customerId");
  }
  get getBranch() {
    return this.searchForm.get("branchId");
  }

  createSearchForm() {
    return this.formBuilder.group({
      customerId: [""],
      branchId: [""],
    });
  }

  commandClick(args: CommandClickEventArgs): void {
    const rowArgs: any = args;
    if (args.commandColumn.buttonOption.content === "View") {
      this.router.navigate(["./view", rowArgs.rowData.id], {
        relativeTo: this.activatedRoute,
      });
    }
  }

  searchData() {
    this.getRouteList();
  }

  resetSearch() {
    this.searchForm.reset();
    this.searchForm.markAsPristine();
    this.searchForm.markAsUntouched();
    this.searchData();

    // this.routeList = [];
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

  public onOpenDialogDelete = function (data: any): void {
    const [{ id, routeName, ...remainingData }, ...others] = data;
    this.DialogObj = DialogUtility.confirm({
      title: "Route",
      content: `Are you sure you want to delete Route <span style="color:red;font-weight:bold"> ${routeName} </span>?`,
      okButton: { text: "OK", click: this.okClickDelete.bind(this, id) },
      showCloseIcon: true,
      closeOnEscape: true,
      animationSettings: { effect: "Zoom" },
    });
  };

  okClickDelete(id): void {
    this.routeService.delete(id).subscribe(
      (res) => {
        if (res) {
          res == -129
            ? this.toastr.showWarningMessage("Route already used!")
            : this.toastr.showSuccessMessage("Route deleted successfully!");
          this.DialogObj.hide();
          this.getRouteList();
        }
      },
      (error) => {
        console.error("err", error);
        this.toastr.showErrorMessage("Unable to delete the Route");
        this.DialogObj.hide();
      }
    );
  }
}
