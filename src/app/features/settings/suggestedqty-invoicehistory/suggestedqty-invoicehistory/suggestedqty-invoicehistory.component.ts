import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { SuggestedqtyInvoicehistoryService } from "../suggestedqty-invoicehistory.service";

@Component({
  selector: "app-suggestedqty-invoicehistory",
  templateUrl: "./suggestedqty-invoicehistory.component.html",
})
export class SuggestedqtyInvoicehistoryComponent implements OnInit {
  sugQtyInvHisFrm: FormGroup;
  submitClicked: boolean;
  get suggestedQtyDuration() {
    return this.sugQtyInvHisFrm.get("suggestedQtyDuration");
  }
  get suggestedQtyExtraPercentage() {
    return this.sugQtyInvHisFrm.get("suggestedQtyExtraPercentage");
  }
  get invoiceHistoryDuration() {
    return this.sugQtyInvHisFrm.get("invoiceHistoryDuration");
  }

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToasterServiceService,
    public suggestedqtyinvhxService: SuggestedqtyInvoicehistoryService
  ) {}

  ngOnInit() {
    this.getDetails();
    this.sugQtyInvHisFrm = this.createQtyInvForm();
    this.submitClicked = false;
  }

  getDetails() {
    this.suggestedqtyinvhxService.getAll().subscribe((resp) => {
      if (resp[0].id) this.sugQtyInvHisFrm = this.createQtyInvForm(resp[0]);
    });
  }
  createQtyInvForm(editData?) {
    return this.formBuilder.group({
      id: [editData ? editData.id : 0],

      suggestedQtyDuration: [
        editData ? editData.suggestedQtyDuration : "",
        [Validators.required,Validators.max(9999)],
      ],
      suggestedQtyExtraPercentage: [
        editData ? editData.suggestedQtyExtraPercentage : "",
        [Validators.required,Validators.max(999)],
      ],
      invoiceHistoryDuration: [
        editData ? editData.invoiceHistoryDuration : "",
        [Validators.required,Validators.max(9999)],
      ],
    });
  }

  close(){
    window.history.back();
  }
  saveData() {
    this.submitClicked = true;
    if (this.sugQtyInvHisFrm.valid) {
      let payload = this.sugQtyInvHisFrm.value;
      if (payload.id) {
        this.suggestedqtyinvhxService.update(payload).subscribe(
          (resp) => {
            this.toastr.showSuccessMessage("Details Updated successfully!");
          },
          (error) => {
            this.toastr.showErrorMessage("Unable update details");
          }
        );
      } else {
        this.suggestedqtyinvhxService.add(payload).subscribe(
          (resp) => {
            this.toastr.showSuccessMessage("Details Added successfully!");
          },
          (error) => {
            this.toastr.showErrorMessage("Unable to add details");
          }
        );
      }
    }
  }
}
