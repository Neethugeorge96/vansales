import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ItemGrouppingComponent } from "./item-groupping/item-groupping.component";
import { RouterModule } from "@angular/router";
import { GridAllModule } from "@syncfusion/ej2-angular-grids";
import { MultiSelectModule } from "@syncfusion/ej2-angular-dropdowns";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ItemGrouppingComponent],
  imports: [
    CommonModule,
    GridAllModule,
    MultiSelectModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: ItemGrouppingComponent,
        data: { breadcrumbs: ["Masters", "Item Grouping"] },
      },
    ]),
  ],
})
export class ItemGrouppingModule {}
