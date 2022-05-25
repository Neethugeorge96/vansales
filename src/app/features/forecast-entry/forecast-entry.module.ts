import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ForecastEntryComponent } from "./forecast-entry/forecast-entry.component";
import { RouterModule } from "@angular/router";
import { DatePickerModule } from "@syncfusion/ej2-angular-calendars";
import { DropDownListModule } from "@syncfusion/ej2-angular-dropdowns";
import { ReactiveFormsModule } from "@angular/forms";
import { GridAllModule } from "@syncfusion/ej2-angular-grids";
import { ForcastEntryListComponent } from './forcast-entry-list/forcast-entry-list.component';

@NgModule({
  declarations: [ForecastEntryComponent, ForcastEntryListComponent],
  imports: [
    CommonModule,
    DatePickerModule,
    DropDownListModule,
    ReactiveFormsModule,
    GridAllModule,
    RouterModule.forChild([

      {
        path: "",
        component: ForcastEntryListComponent,
        data: { breadcrumbs: ["Forecast Entry list"] },
      },
      {
        path: "create",
        component: ForecastEntryComponent,
        data: { breadcrumbs: ["Forecast Entry"] },
      },
      {
        path: "edit/:id",
        component: ForecastEntryComponent,
        data: { breadcrumbs: ["Forecast Entry"] },
      },
    ]),
  ],
})
export class ForecastEntryModule {}
