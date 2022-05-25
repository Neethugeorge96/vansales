import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouteComponent } from "./route/route.component";
import { RouterModule } from "@angular/router";
import { GridAllModule } from "@syncfusion/ej2-angular-grids";
import { RouteAddEditViewComponent } from "./route-add-edit-view/route-add-edit-view.component";
import { ButtonModule, CheckBoxModule } from "@syncfusion/ej2-angular-buttons";
import { DropDownListModule } from "@syncfusion/ej2-angular-dropdowns";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NumericTextBoxModule } from "@syncfusion/ej2-angular-inputs";
import { DatePickerModule } from "@syncfusion/ej2-angular-calendars";
import { DialogModule } from "@syncfusion/ej2-angular-popups";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [RouteComponent, RouteAddEditViewComponent],
  imports: [
    CommonModule,
    GridAllModule,
    CheckBoxModule,
    DialogModule,
    DatePickerModule,
    SharedModule,
    DropDownListModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    NumericTextBoxModule,
    RouterModule.forChild([
      {
        path: "",
        component: RouteComponent,
        data: { breadcrumbs: ["Masters", "Route"] },
      },
      {
        path: "create",
        component: RouteAddEditViewComponent,
        data: { breadcrumbs: ["Masters", "Route"] },
      },
      {
        path: "edit/:id",
        component: RouteAddEditViewComponent,
        data: { breadcrumbs: ["Masters", "Route"] },
      },
      {
        path: "view/:id",
        component: RouteAddEditViewComponent,
        data: { breadcrumbs: ["Masters", "Route"] },
      },
    ]),
  ],
})
export class RouteModule {}
