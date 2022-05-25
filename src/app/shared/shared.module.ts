import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DialogsModule } from "./dialogs/dialogs.module";
import { ButtonWithDropdownComponent } from "./button-with-dropdown/button-with-dropdown.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  DropDownListAllModule,
  DropDownListModule,
} from "@syncfusion/ej2-angular-dropdowns";
import { ButtonModule } from "@syncfusion/ej2-angular-buttons";
import { DropdownWithTableComponent } from "./dropdown-with-table/dropdown-with-table.component";
import { FileUploaderComponent } from "./file-uploader/file-uploader.component";
import { DialogModule } from "@syncfusion/ej2-angular-popups";
import { ValidateExcelComponent } from "./validate-excel/validate-excel.component";
import { GridAllModule } from "@syncfusion/ej2-angular-grids";

@NgModule({
  declarations: [
    ButtonWithDropdownComponent,
    DropdownWithTableComponent,
    ValidateExcelComponent,
    FileUploaderComponent,
  ],
  imports: [
    CommonModule,
    DialogsModule,
    FormsModule,
    DialogModule,
    ReactiveFormsModule,
    DropDownListModule,
    ButtonModule,
    DropDownListAllModule,
    GridAllModule,
  ],
  exports: [
    ButtonWithDropdownComponent,
    DropdownWithTableComponent,
    FileUploaderComponent,
    ValidateExcelComponent,
  ],
})
export class SharedModule {}
