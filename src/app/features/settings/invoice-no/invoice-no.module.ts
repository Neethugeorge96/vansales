import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceNoComponent } from './invoice-no/invoice-no.component';
import { RouterModule } from "@angular/router";
import { DropDownListModule } from "@syncfusion/ej2-angular-dropdowns";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TextBoxModule } from "@syncfusion/ej2-angular-inputs";
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';



@NgModule({
  declarations: [InvoiceNoComponent],
  imports: [
    CommonModule,
    DropDownListModule,
    FormsModule,
    ReactiveFormsModule,
    TextBoxModule,
    GridAllModule,
    CheckBoxModule,
    DatePickerAllModule,

    RouterModule.forChild([
      {
        path: "",
        component: InvoiceNoComponent,
        data: { breadcrumbs: ["Settings", "Invoice No"] },
      },
    ]),
  ]
})
export class InvoiceNoModule { }
