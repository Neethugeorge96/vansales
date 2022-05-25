import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  CommandModel,
  EditSettingsModel,
  GridComponent,
  SaveEventArgs,
} from "@syncfusion/ej2-angular-grids";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";
import { UserService } from "../../user/user.service";
import * as _ from "lodash";
import { ActivatedRoute, Router } from "@angular/router";
import { RouteService } from "../route.service";
import * as moment from "moment";
import { DialogUtility } from "@syncfusion/ej2-angular-popups";
import {
  duplicateCodeValidator,
  duplicateNameValidator,
} from "../../../../shared/utils/validators.functions";
import { HttpParams } from "@angular/common/http";
import { ClickEventArgs } from "@syncfusion/ej2-navigations";
import { sampleExcelDownloader } from "src/app/shared/utils/common.functions";

@Component({
  selector: "app-route-add-edit-view",
  templateUrl: "./route-add-edit-view.component.html",
})
export class RouteAddEditViewComponent implements OnInit {
  routeHeaderForm: FormGroup;
  searchKey: string;
  selected: boolean = false;
  @ViewChild("grid", { static: false }) public grid: GridComponent;
  insertData: any;
  customerList: any[];
  searchResults: any[];
  excelData: any = [];
  gridFields: any;
  showExcelValidation: boolean = false;
  customerListMaster: any[];
  selectedCustomers: any[] = [];
  branchList: any[];
  routeData: any;
  viewMode: boolean = false;
  submitClickedMain: boolean;
  showDialog: boolean = false;
  alreadyUsed: { codes: string[] } = {
    codes: [],
  };
  public DialogObj;
  // public flag:boolean =  true;
  get routeNo() {
    return this.routeHeaderForm.get("routeNo");
  }
  get routeName() {
    return this.routeHeaderForm.get("routeName");
  }
  get branchId() {
    return this.routeHeaderForm.get("branchId");
  }
  get isActive() {
    return this.routeHeaderForm.get("isActive");
  }

  editExternal: EditSettingsModel = {
    //showDeleteConfirmDialog: true,
    allowAdding: true,
    allowEditing: false,
    allowDeleting: true,
    //mode: "Normal",
    mode: "Dialog",
    allowEditOnDblClick: false,
  };

  toolbarExternal = [
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
    "Add",
    "Search",
  ];

  commands: CommandModel[] = [
    {
      type: "Delete",
      buttonOption: {
        cssClass: "e-flat",
        iconCss: "e-icons e-delete",
      },
    },
  ];
  public flag: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    public syncfusionHelperService: SyncfusionHelperService,
    private userservice: UserService,
    private toastr: ToasterServiceService,
    public activatedRoute: ActivatedRoute,
    private routeService: RouteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCustomerList();
    this.getBranchList();
    if (this.activatedRoute.snapshot.params.id)
      this.getRouteDetails(this.activatedRoute.snapshot.params.id);
    const url = this.router.url.split("/");
    if (_.includes(url, "view")) {
      this.commands[0].buttonOption.disabled = true;
      this.editExternal.allowAdding = false;
      this.viewMode = true;
    }
    this.routeHeaderForm = this.createRouteheaderForm();
  }

  getCustomerList() {
    this.routeService.getCustomers().subscribe(
      (result) => {
        this.customerList = result;
        this.searchResults = result;
        this.customerListMaster = result;
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the customer list");
      }
    );

    let params = new HttpParams();
    params = params.append("customerId", "0");
    params = params.append("branchId", "0");
    this.routeService.getAll(params).subscribe((result) => {
      this.alreadyUsed = {
        codes: result.map((data) => data["routeNo"].toLowerCase()),
      };
    });
  }

  getBranchList() {
    this.userservice.getBranches().subscribe(
      (result) => {
        this.branchList = result;
        this.routeHeaderForm.patchValue({
          branchId: this.routeData ? parseInt(this.routeData.branchId) : "",
        });
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the branch list");
      }
    );
  }

  getRouteDetails(id) {
    this.routeService.getbyId(id).subscribe(
      (result) => {
        this.routeData = result;
        this.routeHeaderForm.controls.routeNo.disable();
        this.routeHeaderForm = this.createRouteheaderForm();
        this.selectedCustomers = this.routeData.routeDetails;
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the route ");
      }
    );
  }

  filterCustomers() {
    this.searchResults = this.customerList.filter((p) => {
      return (
        _.includes(
          p.customerName.toLowerCase(),
          this.searchKey.toLowerCase()
        ) ||
        _.includes(p.code.toLowerCase(), this.searchKey.toLowerCase()) ||
        _.includes(p.location.toLowerCase(), this.searchKey.toLowerCase())
      );
    });
  }

  createRouteheaderForm() {
    return this.formBuilder.group({
      id: [this.routeData ? this.routeData.id : 0],
      routeNo: [
        {
          value: this.routeData ? this.routeData.routeNo : "",
          disabled: this.viewMode ? true : false,
        },
        [
          Validators.maxLength(6),
          Validators.required,
          Validators.pattern(/0*[1-9a-zA-z][0-9a-zA-z]*(\.[0-9a-zA-z]+)?/),
          // duplicateCodeValidator(this.alreadyUsed.codes.filter(x => x !== (this.routeData.routeNo || '').toLowerCase()))
        ],
      ],
      routeName: [
        {
          value: this.routeData ? this.routeData.routeName : "",
          disabled: this.viewMode,
        },
        [Validators.required],
      ],
      branchId: [
        {
          value: this.routeData ? parseInt(this.routeData.branchId) : "",
          disabled: this.viewMode,
        },
        [Validators.required],
      ],
      isActive: [
        {
          value: this.routeData ? this.routeData.isActive : true,
          disabled: this.viewMode,
        },
      ],
      createdDate: [
        {
          value: this.routeData
            ? moment(this.routeData.createdDate).format("DD-MMM-yyyy")
            : "",
          disabled: true,
        },
      ],
    });
  }

  onChangeseqno(data, seqno) {
    const result = this.selectedCustomers.filter(
      (item) => item.code == data.code
    );
    result[0].sequenceNo = seqno;
    // this.selectedCustomers[index].sequenceNo = seqno;
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === "add" || args.requestType === "beginEdit") {
      this.submitClickedMain = true;
      this.searchKey = "";
      if (this.routeHeaderForm.valid) {
        this.customerList = this.customerListMaster.filter(
          (item1) =>
            !this.selectedCustomers.some(
              (item2) => item2.customerId === item1.id
            )
        );

        this.searchResults = this.customerListMaster.filter(
          (item1) =>
            !this.selectedCustomers.some(
              (item2) => item2.customerId === item1.id
            )
        );
        this.searchResults.map((item) => {
          item.selected = false;
        });
      } else {
        this.toastr.showWarningMessage("Please fill basic details");
        args.cancel = true;
      }
    }
    if (args.requestType === "save") {
      this.searchResults.forEach((item) => {
        if (item.selected) {
          this.selectedCustomers.push({
            id: 0,
            routeId: this.activatedRoute.snapshot.params.id
              ? this.activatedRoute.snapshot.params.id
              : 0,
            customerId: item.id,
            customerName: item.customerName,
            locationName: item.location,
            code: item.code,
            locationId: item.locationId,
            sequenceNo: 0,
          });
        }
      });
      this.grid.closeEdit();
    }

    if (args.requestType === "delete") {
      args.cancel = true;
      this.onOpenDialogDelete(args.data);
    }
  }

  actionComplete(args) {
    if (args.requestType === "add") {
      var cancelBtn =
        args.dialog.element.querySelector(".e-footer-content").children[1];
      if (cancelBtn) {
        cancelBtn.style.background = "grey";
        cancelBtn.style.color = "white";
      }
      args.dialog.headerEle.style.color = "#0366d6";
      args.dialog.width = "25%";
      const dialog = args.dialog;
      dialog.header = "Add Customers";
      (args as any).form.addEventListener("keydown", this.keydownFn.bind(this));
    }
  }

  keydownFn(args, e) {
    if (args.which == 13) {
      args.preventDefault();
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
    this.submitClickedMain = true;
    if (
      this.routeHeaderForm.valid &&
      this.selectedCustomers.length &&
      _.uniqBy(this.selectedCustomers, "sequenceNo").length ==
        this.selectedCustomers.length
    ) {
      this.insertData = this.routeHeaderForm.value;
      this.insertData.routeDetails = this.grid.getCurrentViewRecords();
      if (!this.activatedRoute.snapshot.params.id) {
        this.routeService.add(this.insertData).subscribe(
          (res) => {
            if (res) {
              this.toastr.showSuccessMessage("Route added successfully!");
              this.router.navigateByUrl("/masters/routemaster");
            }
          },
          (error) => {
            console.error("err", error);
            this.toastr.showErrorMessage("Unable to add Route");
          }
        );
      } else {
        this.routeService.update(this.insertData).subscribe(
          (res) => {
            if (res) {
              this.toastr.showSuccessMessage("Route updated successfully!");
              this.router.navigateByUrl("/masters/routemaster");
            }
          },
          (error) => {
            console.error("err", error);
            this.toastr.showErrorMessage("Unable to update Route ");
          }
        );
      }
    }
    if (!this.selectedCustomers.length)
      this.toastr.showWarningMessage("Please select atleast one customer");
    if (
      _.uniqBy(this.selectedCustomers, "sequenceNo").length !=
      this.selectedCustomers.length
    )
      this.toastr.showWarningMessage("Sequence No of Customers must be unique");
  }

  public onOpenDialogDelete = function (data: any): void {
    const [{ id, code, ...remainingData }, ...others] = data;
    this.DialogObj = DialogUtility.confirm({
      title: "Customer",
      content: `Are you sure you want to delete Customer Code<span style="color:red;font-weight:bold"> ${code} </span>?`,
      okButton: { text: "OK", click: this.okClickDelete.bind(this, code) },
      showCloseIcon: true,
      closeOnEscape: true,
      animationSettings: { effect: "Zoom" },
    });
  };

  okClickDelete(code): void {
    //let data = this.grid.getCurrentViewRecords();
    this.selectedCustomers.forEach((element, index) => {
      if (element["code"] == code) {
        this.selectedCustomers.splice(index, 1);
      }
    });
    this.grid.refresh();

    this.DialogObj.hide();
    this.toastr.showSuccessMessage("Customer deleted successfully");
  }

  setDuplicate(value) {
    this.alreadyUsed.codes.map((x) => {
      if (x == value.toLowerCase()) {
        this.routeHeaderForm.controls["routeNo"].setErrors({ duplicate: true });
        // this.routeHeaderForm.controls['routeNo'].setValidators(duplicateCodeValidator(this.alreadyUsed.codes.filter(x => x !==value.toLowerCase())))
      }
    });
  }

  clickHandler(args: ClickEventArgs): void {
    if (args.item.id === "sampleFile") {
      let headerList = ["Customer Code", "Sequence No."];
      sampleExcelDownloader(headerList, "Route");
    }

    if (args.item.id === "uploadFile") {
      this.submitClickedMain = true;
      if (this.routeHeaderForm.valid) {
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
        customerCode: item["Customer Code"],
        sequenceNo: item["Sequence No."],
      });
    });
    this.routeService.validateExcelData(payload).subscribe((resp) => {
      this.toastr.showSuccessMessage("File Uploaded Successfully");
      this.excelData = resp;
      this.gridFields = [
        { headerText: "Sl No.", width: "90" },
        { field: "systemRemarks", headerText: "System Remarks" },
        { field: "customerCode", headerText: "Customer Code" },
        { field: "customerName", headerText: "Customer Name" },
        { field: "locationName", headerText: "Location" },
        { field: "sequenceNo", headerText: "Sequence No." },
      ];
      this.showExcelValidation = true;
    });
  }

  updateExcelData(event) {
    if (event === "save") {
      this.excelData.map((item) => {
        this.selectedCustomers.push({
          id: 0,
          routeId: this.activatedRoute.snapshot.params.id
            ? this.activatedRoute.snapshot.params.id
            : 0,
          customerId: item.customerId,
          customerName: item.customerName,
          locationName: item.locationName,
          code: item.customerCode,
          locationId: item.locationId,
          sequenceNo: item.sequenceNo,
        });
      });
      this.selectedCustomers = _.uniqBy(this.selectedCustomers, "customerId");
    }
    this.showExcelValidation = false;
  }

  setToolbar() {
    const url = this.router.url.split("/");
    if (_.includes(url, "view"))
      this.grid.toolbarModule.enableItems(["uploadFile", "sampleFile"], false);
  }
}
