import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserComponent } from "./user/user.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  DropDownListModule,
  MultiSelectModule,
} from "@syncfusion/ej2-angular-dropdowns";
import { GridAllModule } from "@syncfusion/ej2-angular-grids";
import { CheckBoxModule } from "@syncfusion/ej2-angular-buttons";
import { TextBoxModule } from "@syncfusion/ej2-angular-inputs";

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    CheckBoxModule,
    GridAllModule,
    DropDownListModule,
    MultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TextBoxModule,
    RouterModule.forChild([
      {
        path: "",
        component: UserComponent,
        data: { breadcrumbs: ["Masters", "User"] },
      },
    ]),
  ],
})
export class UserModule {}
