import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  CommandClickEventArgs,
  GridComponent,
  SaveEventArgs,
} from "@syncfusion/ej2-angular-grids";
import { DialogUtility } from "@syncfusion/ej2-angular-popups";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";
import { duplicateNameValidator } from "src/app/shared/utils/validators.functions";
import { CustomerDiscountViewModel } from "../customer-discount.model";
import { CustomerDiscountService } from "../customer-discount.service";

@Component({
  selector: "app-customer-discount-list",
  templateUrl: "./customer-discount-list.component.html",
})
export class CustomerDiscountListComponent implements OnInit {
  @ViewChild("grid", { static: true }) grid: GridComponent;
  customerDiscountList: CustomerDiscountViewModel[];
  public DialogObj;

  constructor(
    private toastr: ToasterServiceService,
    private formBuilder: FormBuilder,
    public syncfusionHelperService: SyncfusionHelperService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private customerDiscountService: CustomerDiscountService
  ) {}

  ngOnInit(): void {
    this.getCustomerDiscountList();
  }

  getCustomerDiscountList() {
    this.customerDiscountService.getAll().subscribe(
      (result) => {
        this.customerDiscountList = result;
      },
      (error) => {
        this.toastr.showErrorMessage(
          "Unable to fetch the customer discount list"
        );
      }
    );
  }

  commandClick(args: CommandClickEventArgs): void {
    const rowArgs: any = args;

    if (args.commandColumn.buttonOption.content === "View") {
      console.log(rowArgs);

      this.router.navigate(["./view", rowArgs.rowData.id], {
        relativeTo: this.activatedRoute,
      });
    }
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
    const [{ id, discountCode, ...remainingData }, ...others] = data;
    this.DialogObj = DialogUtility.confirm({
      title: "Customer discount",
      content: `Are you sure you want to delete this Customer discount Code<span style="color:red;font-weight:bold"> ${discountCode} </span>?`,
      okButton: { text: "OK", click: this.okClickDelete.bind(this, id) },
      showCloseIcon: true,
      closeOnEscape: true,
      animationSettings: { effect: "Zoom" },
    });
  };

  okClickDelete(id): void {
    this.customerDiscountService.delete(id).subscribe(
      (res) => {
        if (res) {
          this.toastr.showSuccessMessage(
            "Customer Discount deleted successfully!"
          );
          this.DialogObj.hide();
          this.getCustomerDiscountList();
        }
      },
      (error) => {
        console.error("err", error);
        this.toastr.showErrorMessage("Unable to delete the customer discount ");
        this.DialogObj.hide();
      }
    );
  }
}
