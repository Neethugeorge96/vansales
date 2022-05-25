import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  CommandClickEventArgs,
  CommandModel,
  EditSettingsModel,
  GridComponent,
  SaveEventArgs,
} from "@syncfusion/ej2-angular-grids";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";
import { StocktovanService } from "../stocktovan.service";
import * as _ from "lodash";
import { ActivatedRoute, Router } from "@angular/router";

import { duplicateNameValidator } from "src/app/shared/utils/validators.functions";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  AnimationSettingsModel,
  DialogComponent,
  DialogUtility,
} from "@syncfusion/ej2-angular-popups";
import {
  EmitType,
  detach,
  isNullOrUndefined,
  createElement,
  EventHandler,
} from "@syncfusion/ej2-base";
import {
  FileInfo,
  RemovingEventArgs,
  SelectedEventArgs,
  UploaderComponent,
} from "@syncfusion/ej2-angular-inputs";
import { HttpClient } from "@angular/common/http";
import { sampleExcelDownloader } from "src/app/shared/utils/common.functions";
import * as XLSX from "xlsx";
import { stocktovanModel, StockInDetailsViewModel } from "../stocktovan.model";
import * as moment from "moment";

@Component({
  selector: "app-stocktovan-add",
  templateUrl: "./stocktovan-add.component.html",
})
export class StocktovanAddComponent implements OnInit {
  stockToVanAddFrm: FormGroup;
  @ViewChild("grid", { static: true }) grid: GridComponent;
  @ViewChild("content") modelPopup: any;
  customerList: any[];
  searchResults: any[];
  customerListMaster: any[];
  submitClicked: boolean;
  alreadyUsed: { names: string[] } = {
    names: [],
  };
  maxDate: any = moment().toDate();
  minDate: any = moment().subtract(1, "month").toDate();
  public DialogObj;
  childGrid: any;
  dateErr: boolean = false;
  stocktovanAddlist: any[];
  commands: CommandModel[] = [
    {
      type: "Delete",
      buttonOption: { cssClass: "e-flat", iconCss: "e-icons e-delete" },
    },
  ];

  @ViewChild("ejDialog") ejDialog: DialogComponent;
  @ViewChild("modcontainer", { read: ElementRef }) container: ElementRef;
  public targetElement: HTMLElement;
  public position: object = { X: "right", Y: "top" };
  showDialog: boolean = false;
  file: any;
  fileData: any;

  constructor(
    private formBuilder: FormBuilder,
    public syncfusionHelperService: SyncfusionHelperService,
    private stockToVanService: StocktovanService,
    private toastr: ToasterServiceService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private http: HttpClient
  ) {}

  get fromdate() {
    return this.stockToVanAddFrm.get("fromdate");
  }
  get toDate() {
    return this.stockToVanAddFrm.get("toDate");
  }

  ngOnInit(): void {
    this.stockToVanAddFrm = this.createFormGroup();
    let fromMonth = moment().subtract(1, "month");
    this.stockToVanAddFrm.controls["fromdate"].setValue(
      fromMonth.format("DD/MM/yyyy")
    );
    this.stockToVanAddFrm.controls["toDate"].setValue(
      moment().format("DD/MM/yyyy")
    );

    this.childGrid = {
      dataSource: [],
      queryString: "stockInHeaderId",
      allowPaging: false,
      allowSorting: "true",
      allowResizing: true,
      rowDataBound: this.rowDataBound.bind(this),
      commandClick: this.childCommandClick.bind(this),
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
          // textAlign: "Right",
          width: 120,
        },
        {
          field: "lpoId",
          headerText: "LPO Id",
          width: 150,
        },
        {
          field: "itemCode",
          headerText: "Item Code",
          // textAlign: "Right",
          width: 120,
        },
        {
          field: "quantity",
          headerText: "Quantity",
          width: 150,
        },
        {
          field: "batchNumber",
          headerText: "Batch No.",
          width: 150,
        },
        {
          field: "productionDate",
          headerText: "Production Date",
          width: 150,
          // type: "date",
          // format: "dd-MMM-yyyy",
        },
        {
          field: "expiryDate",
          headerText: "Expiry Date",
          width: 150,
          // type: "date",
          // format: "dd-MMM-yyyy",
        },
        {
          field: "lotNumber",
          headerText: "Lot No.",
          width: 150,
        },
        {
          headerText: "Action",
          width: 150,

          commands: [
            {
              type: "Delete",
              buttonOption: { cssClass: "e-flat", iconCss: "e-icons e-delete" },
            },
          ],
        },
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
        if (
          args.cell.classList.contains("e-unboundcell") &&
          _.find(this.stocktovanAddlist, [
            "stockInHeaderId",
            args.data.stockInHeaderId,
          ]).acknowledgement == true
        ) {
          args.cell.querySelector(
            "button[title='Delete']"
          ).ej2_instances[0].disabled = true;
          args.cell
            .querySelector("button[title='Delete']")
            .classList.add("e-disabled");
        }
      },
    };

    this.searchList();
  }

  createFormGroup(Data?: any): FormGroup {
    return this.formBuilder.group({
      id: [!Data ? 0 : Data.id],
      fromdate: [Data ? Data.fromDate : "", [Validators.required]],
      toDate: [Data ? Data.toDate : "", [Validators.required]],
    });
  }

  public onOpenDialog = function (event: any): void {
    this.showDialog = true;
    this.ejDialog.show();
  };

  public onOverlayClick: EmitType<object> = () => {
    this.showDialog = false;
    this.ejDialog.hide();
  };

  public validation(event: any): void {
    if (this.showDialog) {
      event.cancel = false;
    } else {
      event.cancel = true;
    }
  }

  // const file:File = event.target.files[0];

  // if (file) {

  //     this.fileName = file.name;

  //     const formData = new FormData();

  //     formData.append("thumbnail", file);

  //     const upload$ = this.http.post("/api/thumbnail-upload", formData);

  //     upload$.subscribe();
  // }

  onFileSelected(event) {
    this.file = event.target.files[0];

    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(event.target.files[0]);
    fileReader.onload = (e) => {
      let arrayBuffer: any = fileReader.result;
      var data = new Uint8Array(arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {
        type: "binary",
        cellDates: true,
        dateNF: "dd/mm/yyyy",
      });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.fileData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
      this.fileData.map((item) => {
        item.StockCode = item["Import Reference Code"];
        item.ItemCode = item["*Item Code"];
        item.LocationCode = item["*Location Code"];
        item.Quantity = item["*Quantity"];
        item.RouteNo = item["*Route No"];
        item.VanNumber = item["*Van Number"];
        item.CustomerCode = item["Customer Code"];
        item.LPOId = item["LPO Id"];
        item.BatchNumber = item["Batch Number"];
        item.LotNumber = item["Lot Number"];

        [
          "*Item Code",
          "*Location Code",
          "*Quantity",
          "*Route No",
          "*Van Number",
          "Customer Code",
          "LPO Id",
          "Lot Number",
          "Import Reference Code",
          "Batch Number",
        ].forEach((e) => delete item[e]);

        item.ExpiryDate = item["Expiry Date(DD/MM/YYYY)"]
          ? item["Expiry Date(DD/MM/YYYY)"]
          : "";
        item.StockInDate = item["*Stock In Date(DD/MM/YYYY)"]
          ? item["*Stock In Date(DD/MM/YYYY)"]
          : "";
        item.ProductionDate = item["Production Date(DD/MM/YYYY)"]
          ? item["Production Date(DD/MM/YYYY)"]
          : "";
        item.erpRefId = null;
      });
      if (_.uniqBy(this.fileData, "StockInDate").length > 1) {
        this.dateErr = true;
        this.toastr.showWarningMessage(
          "File Contains entries with different dates"
        );
      } else this.dateErr = false;
    };
  }

  removeSelectedFile(index) {
    this.file = "";
  }

  downloadExcel() {
    let headerList = [
      "Import Reference Code",
      "*Stock In Date(DD/MM/YYYY)",
      "*Route No",
      "*Van Number",
      "*Location Code",
      "Customer Code",
      "LPO Id",
      "*Item Code",
      "Batch Number",
      "Production Date(DD/MM/YYYY)",
      "Expiry Date(DD/MM/YYYY)",
      "Lot Number",
      "*Quantity",
    ];
    sampleExcelDownloader(headerList, "stock to van");
  }

  getchildgridData(args) {
    var rowData = args.data;
    this.stockToVanService.getbyId(rowData.id).subscribe((resp) => {
      args.childGrid.dataSource = resp;
      args.childGrid.refreshColumns();
      args.childGrid.refresh();
    });
  }

  searchList() {
    this.submitClicked = true;
    if (this.stockToVanAddFrm.valid) {
      this.stockToVanService
        .getAll(this.stockToVanAddFrm.value)
        .subscribe((resp) => {
          resp.map((data: any) => {
            data.stockInHeaderId = data.id;
          });
          this.stocktovanAddlist = resp;
        });
    }
  }

  upload() {
    this.stockToVanService.validateExcel(this.fileData).subscribe(
      (res) => {
        if (res) {
          this.toastr.showSuccessMessage("File uploaded successfully");
          this.router.navigate(["/stock-to-van/remarks"]);
          this.stockToVanService.setRemarks(res);
        }
      },
      (error) => {
        console.error("err", error);
        this.toastr.showErrorMessage("Unable to validate");
      }
    );
  }

  commandClick(args: CommandClickEventArgs): void {
    if (
      args.commandColumn.type === "Delete" &&
      !(<any>args.target).ej2_instances[0].disabled
    ) {
      args.cancel = true;
      this.onOpenDialogDelete(args.rowData);
    }
  }

  public onOpenDialogDelete = function (data: any): void {
    this.DialogObj = DialogUtility.confirm({
      title: "Stock To Van",
      content: `Are you sure you want to delete the Stock To Van <span style="color:red;font-weight:bold"> ${data.stockCode} </span>?`,
      okButton: { text: "OK", click: this.okClickDelete.bind(this, data.id) },
      showCloseIcon: true,
      closeOnEscape: true,
      animationSettings: { effect: "Zoom" },
    });
  };

  okClickDelete(id): void {
    this.stockToVanService.delete(id).subscribe(
      (res) => {
        if (res) {
          this.toastr.showSuccessMessage("Stock to van deleted successfully!");
          this.DialogObj.hide();
          this.searchList();
        }
      },
      (error) => {
        console.error("err", error);
        this.toastr.showErrorMessage(
          "Unable to delete the Stock to van Details"
        );
        this.DialogObj.hide();
      }
    );
  }

  childCommandClick(args: CommandClickEventArgs) {
    if (
      args.commandColumn.type === "Delete" &&
      !(<any>args.target).ej2_instances[0].disabled
    ) {
      args.cancel = true;
      this.onOpenChildDialogDelete(args.rowData);
    }
  }

  public onOpenChildDialogDelete = function (data: any): void {
    this.DialogObj = DialogUtility.confirm({
      title: "Stock To Van",
      content: `Are you sure you want to delete the Stock To Van <span style="color:red;font-weight:bold"> ${data.itemCode} </span>?`,
      okButton: {
        text: "OK",
        click: this.okChildClickDelete.bind(this, data.id),
      },
      showCloseIcon: true,
      closeOnEscape: true,
      animationSettings: { effect: "Zoom" },
    });
  };

  okChildClickDelete(id): void {
    this.stockToVanService.StockToVanDetailsDelete(id).subscribe(
      (res) => {
        if (res) {
          this.toastr.showSuccessMessage("Stock to van deleted successfully!");
          this.DialogObj.hide();
          this.searchList();
        }
      },
      (error) => {
        console.error("err", error);
        this.toastr.showErrorMessage(
          "Unable to delete the Stock to van Details"
        );
        this.DialogObj.hide();
      }
    );
  }

  queryCellInfo(args) {
    if (
      args.cell.classList.contains("e-unboundcell") &&
      args.data.acknowledgement == true
    ) {
      args.cell.querySelector(
        "button[title='Delete']"
      ).ej2_instances[0].disabled = true;
      args.cell
        .querySelector("button[title='Delete']")
        .classList.add("e-disabled");
    }
  }

  rowDataBound(args) {
    var rowIndex = parseInt(args.row.getAttribute("aria-rowIndex"));

    args.row.cells[0].innerText = rowIndex + 1;
  }
}
