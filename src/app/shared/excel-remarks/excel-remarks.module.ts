import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExcelRemarksComponent } from "./excel-remarks/excel-remarks.component";
import { RouterModule } from "@angular/router";
import { GridAllModule } from "@syncfusion/ej2-angular-grids";

@NgModule({
  declarations: [ExcelRemarksComponent],
  imports: [
    CommonModule,
    GridAllModule,
    RouterModule.forChild([
      {
        path: "",
        component: ExcelRemarksComponent,
        data: { breadcrumbs: ["Remarks"] },
      },
    ]),
  ],
})
export class ExcelRemarksModule {}
