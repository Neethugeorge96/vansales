import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CheckBoxSelectionService } from "@syncfusion/ej2-angular-dropdowns";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";
import { dropDownformatter } from "src/app/shared/utils/common.functions";
import { ExportService } from "../export.service";

@Component({
  selector: "app-export",
  templateUrl: "./export.component.html",
  providers: [CheckBoxSelectionService],
})
export class ExportComponent implements OnInit {
  exportForm: FormGroup;
  submitClicked: boolean = false;
  routeData: any[];

  constructor(
    public formBuilder: FormBuilder,
    public exportSrv: ExportService,
    public toastSrv: ToasterServiceService,
    public syncfusionHelperService: SyncfusionHelperService
  ) {}

  get date() {
    return this.exportForm.get("date");
  }

  get routeList() {
    return this.exportForm.get("routeList");
  }

  ngOnInit(): void {
    this.getRoutes(new Date());
    this.exportForm = this.createExportForm();
  }

  getRoutes(date) {
    if (date) {
      this.exportSrv.getActiveRoutes(date).subscribe(
        (resp) => {
          this.routeData = resp;
          this.routeData = dropDownformatter(
            this.routeData,
            "routeNo",
            "routeName"
          );
          this.exportForm.patchValue({ routeList: "" });
        },
        (err) => {
          this.toastSrv.showErrorMessage("Failed to load routes");
        }
      );
    }
  }

  createExportForm() {
    return this.formBuilder.group({
      date: [new Date(), [Validators.required]],
      routeList: ["", [Validators.required]],
    });
  }

  saveData() {
    this.submitClicked = true;
    if (this.exportForm.valid) {
      let payload = this.exportForm.value;
      payload.employeeId = JSON.parse(localStorage.getItem("employeeId"));
      this.exportSrv.export(payload).subscribe(
        (resp) => {
          resp == 0
            ? this.toastSrv.showWarningMessage("No Data Found!")
            : this.toastSrv.showSuccessMessage("Data Exported Successfully");
        },
        (err) => {
          this.toastSrv.showErrorMessage("Failed to export Data");
        }
      );
    }
  }

  resetData() {
    this.exportForm.reset();
  }
}
