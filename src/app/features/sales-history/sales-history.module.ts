import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SalesHistoryComponent } from "./sales-history/sales-history.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { DatePickerModule } from "@syncfusion/ej2-angular-calendars";
import { DropDownListModule } from "@syncfusion/ej2-angular-dropdowns";
import { GridAllModule } from "@syncfusion/ej2-angular-grids";

@NgModule({
  declarations: [SalesHistoryComponent],
  imports: [
    CommonModule,
    DatePickerModule,
    DropDownListModule,
    ReactiveFormsModule,
    GridAllModule,
    RouterModule.forChild([
      {
        path: "",
        component: SalesHistoryComponent,
        data: { breadcrumbs: ["Sales History"] },
      },
    ]),
  ],
})
export class SalesHistoryModule {}
