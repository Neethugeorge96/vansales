import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomerComponent } from "./customer/customer.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  AutoCompleteModule,
  DropDownListModule,
} from "@syncfusion/ej2-angular-dropdowns";
import { GridAllModule } from "@syncfusion/ej2-angular-grids";
import { CheckBoxModule } from "@syncfusion/ej2-angular-buttons";
import { AgmCoreModule } from "@agm/core";
import { MaskedTextBoxModule } from "@syncfusion/ej2-angular-inputs";
@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    GridAllModule,
    DropDownListModule,
    ReactiveFormsModule,
    FormsModule,
    CheckBoxModule,
    AutoCompleteModule,
    MaskedTextBoxModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBhPxY0yN1Ku_uaOmRzvrF0F7kRat8Kx6A",
      libraries: ["places"],
    }),
    RouterModule.forChild([
      {
        path: "",
        component: CustomerComponent,
        data: { breadcrumbs: ["Masters", "Customer"] },
      },
    ]),
  ],
})
export class CustomerModule {}
