import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomerDiscountComponent } from "./customer-discount/customer-discount.component";
import { GridAllModule } from "@syncfusion/ej2-angular-grids";
import {
  AutoCompleteModule,
  DropDownListModule,
} from "@syncfusion/ej2-angular-dropdowns";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CheckBoxModule, SwitchModule } from "@syncfusion/ej2-angular-buttons";
import { MaskedTextBoxModule } from "@syncfusion/ej2-angular-inputs";
import { RouterModule } from "@angular/router";
import { CustomerDiscountListComponent } from "./customer-discount-list/customer-discount-list.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [CustomerDiscountComponent, CustomerDiscountListComponent],
  imports: [
    CommonModule,
    GridAllModule,
    DropDownListModule,
    ReactiveFormsModule,
    FormsModule,
    CheckBoxModule,
    AutoCompleteModule,
    MaskedTextBoxModule,
    SwitchModule,
    SharedModule,

    RouterModule.forChild([
      {
        path: "",
        component: CustomerDiscountListComponent,
        data: { breadcrumbs: ["Masters", "Customer Discount "] },
      },
      {
        path: "create",
        component: CustomerDiscountComponent,
        data: { breadcrumbs: ["Masters", "Customer Discount"] },
      },
      {
        path: "edit/:id",
        component: CustomerDiscountComponent,
        data: { breadcrumbs: ["Masters", "Customer Discount"] },
      },
      {
        path: "view/:id",
        component: CustomerDiscountComponent,
        data: { breadcrumbs: ["Masters", "Customer Discount"] },
      },
    ]),
  ],
})
export class CustomerDiscountModule {}
