import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ItemsComponent } from "./items/items.component";
import { ButtonModule, CheckBoxModule } from "@syncfusion/ej2-angular-buttons";
import { GridAllModule } from "@syncfusion/ej2-angular-grids";
import { DropDownListModule } from "@syncfusion/ej2-angular-dropdowns";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ImportItemsComponent } from "./import-items/import-items.component";

@NgModule({
  declarations: [ItemsComponent, ImportItemsComponent],
  imports: [
    CommonModule,
    GridAllModule,
    DropDownListModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    RouterModule.forChild([
      {
        path: "",
        component: ItemsComponent,
        data: { breadcrumbs: ["Masters", "Item"] },
      },
      {
        path: "import",
        component: ImportItemsComponent,
        data: { breadcrumbs: ["Masters", "Item"] },
      },
    ]),
    CheckBoxModule,
  ],
})
export class ItemsModule {}
