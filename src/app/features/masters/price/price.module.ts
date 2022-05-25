import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RouterModule } from "@angular/router";
import {
  CheckBoxModule,
  RadioButtonModule,
} from "@syncfusion/ej2-angular-buttons";
import { GridAllModule } from "@syncfusion/ej2-angular-grids";
import {
  CheckBoxSelectionService,
  DropDownListModule,
  MultiSelectModule,
} from "@syncfusion/ej2-angular-dropdowns";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TextBoxModule } from "@syncfusion/ej2-angular-inputs";
import { PriceListComponent } from "./price-list/price-list.component";
import { PriceDetailsComponent } from "./price-details/price-details.component";
import { DatePickerModule } from "@syncfusion/ej2-angular-calendars";
import { DialogModule } from "@syncfusion/ej2-angular-popups";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [PriceListComponent, PriceDetailsComponent],
  imports: [
    CommonModule,
    GridAllModule,
    DropDownListModule,
    CheckBoxModule,
    DialogModule,
    ReactiveFormsModule,
    DatePickerModule,
    TextBoxModule,
    RadioButtonModule,
    FormsModule,
    SharedModule,
    MultiSelectModule,
    RouterModule.forChild([
      {
        path: "",
        component: PriceListComponent,
        data: { breadcrumbs: ["Masters", "Price List"] },
      },
      {
        path: "create",
        component: PriceDetailsComponent,
        data: { breadcrumbs: ["Masters", "Price List"] },
      },
      {
        path: "edit/:id",
        component: PriceDetailsComponent,
        data: { breadcrumbs: ["Masters", "Price List"] },
      },
      {
        path: "view/:id",
        component: PriceDetailsComponent,
        data: { breadcrumbs: ["Masters", "Price List"] },
      },
      // {
      //   path: "create",
      //   component: PriceComponent,
      //   data: { breadcrumbs: ["Masters", "Create"] },
      // },
    ]),
  ],
  providers: [CheckBoxSelectionService],
})
export class PriceModule {}
