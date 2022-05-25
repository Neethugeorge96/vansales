import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NetBillComponent } from "./net-bill/net-bill.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { DropDownListModule } from "@syncfusion/ej2-angular-dropdowns";
import { DatePickerModule } from "@syncfusion/ej2-angular-calendars";
import { GridAllModule } from "@syncfusion/ej2-angular-grids";

@NgModule({
  declarations: [NetBillComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropDownListModule,
    DatePickerModule,
    GridAllModule,
    RouterModule.forChild([
      {
        path: "",
        component: NetBillComponent,
        data: { breadcrumbs: ["Net Bill"] },
      },
    ]),
  ],
})
export class NetBillModule {}
