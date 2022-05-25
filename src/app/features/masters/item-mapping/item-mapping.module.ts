
import { ItemMappingComponent } from './item-mapping/item-mapping.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { GridAllModule } from "@syncfusion/ej2-angular-grids";
import { CheckBoxModule } from "@syncfusion/ej2-angular-buttons";
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';



@NgModule({
  declarations: [ItemMappingComponent],
  imports: [ CommonModule,
    ReactiveFormsModule,
    GridAllModule,
    CheckBoxModule,
    DropDownListModule,
    RouterModule.forChild([
      {
        path: "",
        component: ItemMappingComponent,
        data: { breadcrumbs: ["Masters", "Item Mapping"] },
      },
    ]),
  ]
})
export class ItemMappingModule { }
