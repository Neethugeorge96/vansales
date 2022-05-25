import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AssignmentComponent } from "./assignment/assignment.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GridAllModule } from "@syncfusion/ej2-angular-grids";
import { DatePickerModule } from "@syncfusion/ej2-angular-calendars";
import { DropDownListModule } from "@syncfusion/ej2-angular-dropdowns";
import { CheckBoxModule } from "@syncfusion/ej2-angular-buttons";

@NgModule({
  declarations: [AssignmentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GridAllModule,
    DatePickerModule,
    DropDownListModule,
    CheckBoxModule,
    RouterModule.forChild([
      {
        path: "",
        component: AssignmentComponent,
        data: { breadcrumbs: ["Assignment"] },
      },
    ]),
  ],
})
export class AssignmentModule {}
