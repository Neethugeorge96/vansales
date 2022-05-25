import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StocktovanAddComponent } from "./stocktovan-add/stocktovan-add.component";
import { StocktovanSearchComponent } from "./stocktovan-search/stocktovan-search.component";
import { RouterModule } from "@angular/router";
import { GridAllModule } from "@syncfusion/ej2-angular-grids";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DatePickerModule } from "@syncfusion/ej2-angular-calendars";
import { ButtonModule } from "@syncfusion/ej2-angular-buttons";
import { DialogModule } from "@syncfusion/ej2-angular-popups";
import { UploaderModule } from "@syncfusion/ej2-angular-inputs";
import { RemarksFromExcelComponent } from "./remarks-from-excel/remarks-from-excel.component";
import { DropDownListModule } from "@syncfusion/ej2-angular-dropdowns";
import { StocktovanHistoryComponent } from "./stocktovan-history/stocktovan-history.component";

@NgModule({
  declarations: [
    StocktovanAddComponent,
    StocktovanSearchComponent,
    RemarksFromExcelComponent,
    StocktovanHistoryComponent,
  ],
  imports: [
    CommonModule,
    GridAllModule,
    FormsModule,
    DatePickerModule,
    ReactiveFormsModule,
    DialogModule,
    UploaderModule,
    ButtonModule,
    GridAllModule,
    DropDownListModule,
    RouterModule.forChild([
      {
        path: "add",
        component: StocktovanAddComponent,
        data: { breadcrumbs: ["Stock To Van", "Add"] },
      },
      {
        path: "search",
        component: StocktovanSearchComponent,
        data: { breadcrumbs: ["Stock To Van", "Search"] },
      },
      {
        path: "history",
        component: StocktovanHistoryComponent,
        data: { breadcrumbs: ["Stock To Van", "History"] },
      },
      {
        path: "remarks",
        component: RemarksFromExcelComponent,
        data: { breadcrumbs: ["Stock To Van", "remarks"] },
      },
    ]),
  ],
})
export class StockToVanModule {}
