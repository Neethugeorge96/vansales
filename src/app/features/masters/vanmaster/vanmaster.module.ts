import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VanmasterListComponent } from "./vanmaster-list/vanmaster-list.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropDownListModule } from "@syncfusion/ej2-angular-dropdowns";
import { GridAllModule } from "@syncfusion/ej2-angular-grids";

@NgModule({
  declarations: [VanmasterListComponent],
  imports: [
    CommonModule,
    GridAllModule,
    DropDownListModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: VanmasterListComponent,
        data: { breadcrumbs: ["Masters", "Vanmaster"] },
      },
    ]),
  ],
})
export class VanmasterModule {}
