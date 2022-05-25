import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmployeeComponent } from "./employee/employee.component";

import { RouterModule } from "@angular/router";
import { CheckBoxModule, SwitchModule } from "@syncfusion/ej2-angular-buttons";
import { GridAllModule } from "@syncfusion/ej2-angular-grids";
import { DropDownListModule } from "@syncfusion/ej2-angular-dropdowns";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MaskedTextBoxModule } from "@syncfusion/ej2-angular-inputs";

@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    GridAllModule,
    DropDownListModule,
    ReactiveFormsModule,
    FormsModule,
    MaskedTextBoxModule,
    RouterModule.forChild([
      {
        path: "",
        component: EmployeeComponent,
        data: { breadcrumbs: ["Masters", "Employee"] },
      },
    ]),
    CheckBoxModule,
    SwitchModule,
  ],
})
export class EmployeeModule {}
