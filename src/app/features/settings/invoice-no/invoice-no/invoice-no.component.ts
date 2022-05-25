import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  CommandClickEventArgs,
  CommandColumnService,
  CommandModel,
  EditService,
  EditSettingsModel,
  GridComponent,
  PageService,
  SaveEventArgs,
  ToolbarItems,
  ToolbarService,
} from "@syncfusion/ej2-angular-grids";
import { DialogUtility } from "@syncfusion/ej2-angular-popups";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { duplicateNameValidator } from "src/app/shared/utils/validators.functions";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";
import { InvoiceSettings } from "../invoice-no.model";
import { InvoiceNoService } from "../invoice-no.service";
import { dropDownformatter } from "src/app/shared/utils/common.functions";
import { RouteService } from "src/app/features/masters/route/route.service";
import * as moment from "moment";
import * as _ from "lodash";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: "app-invoice-no",
  templateUrl: "./invoice-no.component.html",
  providers: [PageService, EditService, ToolbarService, CommandColumnService],
})
export class InvoiceNoComponent implements OnInit {
  invoiceFrm: FormGroup;
  @ViewChild("grid", { static: true }) grid: GridComponent;
  invoiceList: InvoiceSettings[];
  routeList: any[];
  yearList: any[];
  alreadyUsed: { codes: string[]; names: string[] } = {
    codes: [],
    names: [],
  };
  editData: any;
  @ViewChild("content") modelPopup: any;
  submitClicked: boolean;
  public DialogObj;
  maxDate: any = moment().toDate();
  minDate: any = moment().subtract(10, "year").toDate();
  constructor(
    private toastr: ToasterServiceService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private invoiceNoService: InvoiceNoService,
    public syncfusionHelperService: SyncfusionHelperService,
    private routeService: RouteService
  ) {}

  get routeId() {
    return this.invoiceFrm.get("routeId");
  }
  get docYear() {
    return this.invoiceFrm.get("docYear");
  }
  get salesCashSequenceNo() {
    return this.invoiceFrm.get("salesCashSequenceNo");
  }
  get salesCreditSequenceNo() {
    return this.invoiceFrm.get("salesCreditSequenceNo");
  }
  get returnCashSequenceNo() {
    return this.invoiceFrm.get("returnCashSequenceNo");
  }
  get returnCreditSequenceNo() {
    return this.invoiceFrm.get("returnCreditSequenceNo");
  }
  get leadingZeroLength() {
    return this.invoiceFrm.get("leadingZeroLength");
  }
  get isActive() {
    return this.invoiceFrm.get("isActive");
  }

  commands: CommandModel[] = [
    {
      type: "Edit",
      buttonOption: { cssClass: "e-flat", iconCss: "e-icons e-edit" },
    },
    // { buttonOption: { content: "Print", cssClass: "e-flat btn-print" } },
    {
      type: "Delete",
      buttonOption: { cssClass: "e-flat", iconCss: "e-icons e-delete" },
    },
  ];

  ngOnInit(): void {
    this.getInvoiceList();
    this.getRoutes();
    this.yearList = this.generateArrayOfYears();
  }

  getInvoiceList() {
    this.invoiceNoService.getAll().subscribe(
      (result) => {
        this.invoiceList = _.filter(result, ["isArchived", false]);
        console.log(this.invoiceList);

        // this.alreadyUsed = {
        //   codes: result.map((data) => data["code"].toLowerCase()),
        //   names: result.map((data) => data["itemName"].toLowerCase()),
        // };
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the items list");
      }
    );
  }

  getRoutes() {
    let params = new HttpParams();
    params = params.append("customerId", "0");
    params = params.append("branchId", "0");
    this.routeService.getAll(params).subscribe((result) => {
      this.routeList = _.filter(result, ["isActive", true]);
      this.routeList = dropDownformatter(
        this.routeList,
        "routeNo",
        "routeName"
      );
    });
  }

  generateArrayOfYears() {
    var max = new Date().getFullYear();
    var min = max - 9;
    var years = [];
    for (var i = max; i >= min; i--) {
      years.push(i);
    }
    return years;
  }

  createFormGroup(editData?: any): FormGroup {
    return this.formBuilder.group({
      id: [!editData ? 0 : editData.id],

      routeId: [
        {
          value: editData ? editData.routeId : "",
          disabled:
            editData?.id &&
            (editData?.salesCashSequenceNo ||
              editData?.salesCreditSequenceNo ||
              editData?.returnCashSequenceNo ||
              editData?.returnCreditSequenceNo),
        },
        [Validators.required],
      ],

      // docYear: [ editData ? editData.docYear : moment().format("yyyy"), [Validators.required]],
      docYear: [
        {
          value: editData ? editData.docYear : "",
          disabled:
            editData?.id &&
            (editData?.salesCashSequenceNo ||
              editData?.salesCreditSequenceNo ||
              editData?.returnCashSequenceNo ||
              editData?.returnCreditSequenceNo),
        },
        [Validators.required],
      ],

      salesCashSequenceNo: [
        editData ? editData.salesCashSequenceNo : 0,
        // {
        //   value: editData ? editData.salesCashSequenceNo : 0,
        //   disabled:
        //     !editData?.id ||
        //     (!editData?.salesCashSequenceNo &&
        //       !editData.salesCreditSequenceNo &&
        //       !editData?.returnCashSequenceNo &&
        //       !editData.returnCreditSequenceNo),
        // },
        [Validators.required, Validators.min(editData?.salesCashSequenceNo)],
      ],

      salesCreditSequenceNo: [
        editData ? editData.salesCreditSequenceNo : 0,
        // {
        //   value: editData ? editData.salesCreditSequenceNo : 0,
        //   disabled:
        //     !editData?.id ||
        //     (!editData?.salesCashSequenceNo &&
        //       !editData.salesCreditSequenceNo &&
        //       !editData?.returnCashSequenceNo &&
        //       !editData.returnCreditSequenceNo),
        // },
        [Validators.required, Validators.min(editData?.salesCreditSequenceNo)],
      ],

      returnCashSequenceNo: [
        editData ? editData.returnCashSequenceNo : 0,
        // {
        //   value: editData ? editData.returnCashSequenceNo : 0,
        //   disabled:
        //     !editData?.id ||
        //     (!editData?.salesCashSequenceNo &&
        //       !editData.salesCreditSequenceNo &&
        //       !editData?.returnCashSequenceNo &&
        //       !editData.returnCreditSequenceNo),
        // },
        [Validators.required, Validators.min(editData?.returnCashSequenceNo)],
      ],
      returnCreditSequenceNo: [
        editData ? editData.returnCreditSequenceNo : 0,
        // {
        //   value: editData ? editData.returnCreditSequenceNo : 0,
        //   disabled:
        //     !editData?.id ||
        //     (!editData?.salesCashSequenceNo &&
        //       !editData.salesCreditSequenceNo &&
        //       !editData?.returnCashSequenceNo &&
        //       !editData.returnCreditSequenceNo),
        // },
        [Validators.required, Validators.min(editData?.returnCreditSequenceNo)],
      ],

      leadingZeroLength: [
        {
          value: editData ? editData.leadingZeroLength : "",
          disabled:
            editData?.id &&
            (editData?.salesCashSequenceNo ||
              editData?.salesCreditSequenceNo ||
              editData?.returnCashSequenceNo ||
              editData?.returnCreditSequenceNo),
        },
        [
          Validators.required,
          Validators.pattern(/^[0]+$/),
          Validators.maxLength(8),
        ],
      ],

      isActive: [
        {
          value: editData ? editData.isActive : true,
          disabled:
            editData?.id &&
            (editData?.salesCashSequenceNo ||
              editData?.salesCreditSequenceNo ||
              editData?.returnCashSequenceNo ||
              editData?.returnCreditSequenceNo),
        },
      ],
    });
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
          ? "Edit Invoice  Details"
          : "Add Invoice Details";
    }
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === "add") {
      this.editData = null;
      this.submitClicked = false;
      this.invoiceFrm = this.createFormGroup();
    }
    if (args.requestType === "beginEdit") {
      this.submitClicked = false;
      console.log("rowdata", args.rowData);
      this.invoiceFrm = this.createFormGroup(args.rowData);
      this.editData = args.rowData;
      // this.invoiceNoService.getbyId(args.rowData).subscribe((response) => {
      //   this.invoiceFrm = this.createFormGroup(response);
      // });
    }
    if (args.requestType === "save") {
      console.log(args.requestType);
      args.cancel = true;
      this.submitClicked = true;
      console.log("valid1", this.invoiceFrm.valid);
      const insertdata = this.invoiceFrm.getRawValue();
      console.log("insertdata", insertdata);

      if (this.invoiceFrm.valid) {
        const insertdata = this.invoiceFrm.getRawValue();
        insertdata.routeNo = _.find(this.routeList, [
          "id",
          insertdata.routeId,
        ]).routeNo;
        // insertdata.isArchived = false;

        if (!insertdata.id) {
          this.invoiceNoService.add(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage("Invoice added successfully!");
                this.grid.closeEdit();
                this.getInvoiceList();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage("Unable to add Invoice");
            }
          );
        } else {
          this.invoiceNoService.update(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage("Invoice updated successfully!");
                this.grid.closeEdit();
                this.getInvoiceList();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage("Unable to update Invoice");
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
    const [{ id, routeNo, ...remainingData }, ...others] = data;
    this.DialogObj = DialogUtility.confirm({
      title: "Invoice",
      content: `Are you sure you want to delete Invoice <span style="color:red;font-weight:bold"> ${routeNo} </span>?`,
      okButton: { text: "OK", click: this.okClickDelete.bind(this, id) },
      showCloseIcon: true,
      closeOnEscape: true,
      animationSettings: { effect: "Zoom" },
    });
  };

  okClickDelete(id): void {
    this.invoiceNoService.delete(id).subscribe(
      (res) => {
        if (res) {
          this.toastr.showSuccessMessage("Invoice deleted successfully!");
          this.DialogObj.hide();
          this.getInvoiceList();
        }
      },
      (error) => {
        console.error("err", error);
        this.toastr.showErrorMessage("Unable to delete the Invoice  Details");
        this.DialogObj.hide();
      }
    );
  }

  onDocYearchange() {
    let year = this.invoiceFrm.controls["docYear"].value;

    let routeId = this.invoiceFrm.controls["routeId"].value;
    if (routeId) {
      this.invoiceList.map((x: any) => {
        if (
          x.routeId == routeId &&
          x.docYear == year &&
          (this.editData?.routeId != x.routeId ||
            this.editData?.docYear != x.docYear)
        ) {
          this.toastr.showErrorMessage("Route  and Year already exists");
          this.invoiceFrm.controls["docYear"].setValue(null);
        }
      });
    }
  }

  // onRouteIdChange(event){
  //   console.log(event);
  //   let routeId = event.itemData.id;
  //   console.log("route1",routeId);
  //   let year = this.invoiceFrm.controls["docYear"].value;
  //   console.log("year1",year);
  //    if(year){
  //      this.invoiceList.map((x:any)=>{
  //          console.log("routId2", x.routeId);
  //        console.log("year2", x.docYear);
  //        if(
  //          x.routeId == routeId &&
  //          x.docYear == year
  //          ){
  //           this.toastr.showErrorMessage(  "Route  and year already exists"  );

  //          }
  //      });
  //    }

  // }

  queryCellInfo(args) {
    if (
      args.cell.classList.contains("e-unboundcell") &&
      (args.data.salesCashSequenceNo != 0 ||
        args.data.salesCreditSequenceNo != 0 ||
        args.data.returnCashSequenceNo != 0 ||
        args.data.returnCreditSequenceNo != 0)
    ) {
      args.cell.querySelector(
        "button[title='Delete']"
      ).ej2_instances[0].disabled = true;
      args.cell
        .querySelector("button[title='Delete']")
        .classList.add("e-disabled");
    }
  }
}
