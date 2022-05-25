import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuggestedqtyInvoicehistoryComponent } from "./suggestedqty-invoicehistory/suggestedqty-invoicehistory.component";
import { RouterModule } from "@angular/router";
import { DropDownListModule } from "@syncfusion/ej2-angular-dropdowns";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TextBoxModule } from "@syncfusion/ej2-angular-inputs";

@NgModule({
  declarations: [SuggestedqtyInvoicehistoryComponent],
  imports: [
    CommonModule,
    DropDownListModule,
    FormsModule,
    ReactiveFormsModule,
    TextBoxModule,

    RouterModule.forChild([
      {
        path: "",
        component: SuggestedqtyInvoicehistoryComponent,
        data: { breadcrumbs: ["Settings", "Suggested Quantity & Invoice History"] },
      },
    ]),
  ],
})
export class SuggestedqtyInvoicehistoryModule {}
