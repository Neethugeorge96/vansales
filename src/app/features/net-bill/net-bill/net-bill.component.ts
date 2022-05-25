import { HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { dropDownformatter } from "src/app/shared/utils/common.functions";
import { CustomerService } from "../../masters/customer/customer.service";
import * as _ from "lodash";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";
import { NetBillService } from "../net-bill.service";
import { ToolbarItems } from "@syncfusion/ej2-angular-grids";

@Component({
  selector: "app-net-bill",
  templateUrl: "./net-bill.component.html",
})
export class NetBillComponent implements OnInit {
  searchForm: FormGroup;
  showCustomerClearBtn: boolean = false;
  showPaymentClearBtn: boolean = false;
  submitClickedMain: boolean = false;
  maxDate: any = moment().toDate();
  minDate: any = moment().subtract(1, "month").toDate();
  customerList: any[];
  netBillList: any[];
  paymentStatusList: any[] = [
    { text: "Fully Paid", value: "true" },
    { text: "Partially Paid", value: "false" },
  ];
  toolbarExternal: ToolbarItems[] = ["Search"];

  get fromDate() {
    return this.searchForm.get("fromDate");
  }
  get toDate() {
    return this.searchForm.get("toDate");
  }
  get customerId() {
    return this.searchForm.get("customerId");
  }
  get paymentStatus() {
    return this.searchForm.get("paymentStatus");
  }
  constructor(
    public formBuilder: FormBuilder,
    public customerService: CustomerService,
    public toastSrv: ToasterServiceService,
    public syncfusionHelperService: SyncfusionHelperService,
    public netBillService: NetBillService
  ) {}

  ngOnInit(): void {
    this.getCustomerList();
    this.searchForm = this.createSearchForm();
    this.searchData();
  }

  getCustomerList() {
    let params = new HttpParams();
    params = params.append("saleTypeId", "0");
    params = params.append("customerStatus", "0");
    this.customerService.getAll(params).subscribe(
      (resp) => {
        resp = _.filter(resp, ["activeStatus", 1]);

        this.customerList = dropDownformatter(resp, "code", "customerName");
      },
      (error) => {
        this.toastSrv.showErrorMessage("Unable to fetch Customer List");
      }
    );
  }

  searchData() {
    this.submitClickedMain = true;
    if (this.searchForm.valid) {
      this.netBillService.getAllNetbills(this.searchForm.value).subscribe(
        (resp) => {
          this.netBillList = resp;
        },
        (err) => {
          this.toastSrv.showErrorMessage("Unable to fetch Net bills");
        }
      );
    }
  }

  resetSearch() {
    this.submitClickedMain = false;
    this.searchForm.reset();
    this.netBillList = [];
  }

  createSearchForm() {
    return this.formBuilder.group({
      fromDate: [
        moment().subtract(30, "days").format("DD/MM/yyyy"),
        Validators.required,
      ],
      paymentStatus: [""],
      toDate: [moment().format("DD/MM/yyyy"), Validators.required],
      customerId: [""],
    });
  }
}
