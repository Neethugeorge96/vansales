import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SyncfusionHelperService } from "../../services/syncfusion-helper.service";
import { ExcelSrvService } from "../excel-srv.service";

@Component({
  selector: "app-excel-remarks",
  templateUrl: "./excel-remarks.component.html",
})
export class ExcelRemarksComponent implements OnInit {
  public gridFields: any;
  public data: any;
  public currentData: any;
  saveBtnDisabled: boolean;

  constructor(
    public syncfusionHelperService: SyncfusionHelperService,
    public excelSrv: ExcelSrvService,
    public route: Router
  ) {}
  ngOnInit(): void {
    this.excelSrv.data.subscribe((resp) => {
      this.data = resp;
      this.checkRemarks();
    });

    this.excelSrv.gridFields.subscribe((result) => {
      this.gridFields = result;
    });

    this.excelSrv.currentDetails.subscribe((data) => {
      this.currentData = data;
    });
  }

  checkRemarks() {
    let checkVal = false;
    for (let i in this.data) {
      if (this.data[i].systemRemarks != "Verified Successfully") {
        checkVal = true;
        break;
      }
    }
    if (checkVal == true) {
      this.saveBtnDisabled = true;
    }
  }

  Clear() {
    window.history.back();
  }

  Save() {
    this.excelSrv.updateExcelValidity(true);
    this.route.navigateByUrl(this.currentData["Route"]);
  }
}
