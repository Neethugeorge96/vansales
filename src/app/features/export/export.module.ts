import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExportComponent } from "./export/export.component";
import { RouterModule } from "@angular/router";
import { DatePickerModule } from "@syncfusion/ej2-angular-calendars";
import { ReactiveFormsModule } from "@angular/forms";
import { MultiSelectAllModule } from "@syncfusion/ej2-angular-dropdowns";

@NgModule({
  declarations: [ExportComponent],
  imports: [
    CommonModule,
    DatePickerModule,
    ReactiveFormsModule,
    MultiSelectAllModule,
    RouterModule.forChild([
      {
        path: "",
        component: ExportComponent,
        data: { breadcrumbs: ["Export"] },
      },
    ]),
  ],
})
export class ExportModule {}
