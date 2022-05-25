import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationSettingsComponent } from './integration-settings/integration-settings.component';

import { RouterModule } from "@angular/router";
import { DropDownListModule } from "@syncfusion/ej2-angular-dropdowns";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TextBoxModule } from "@syncfusion/ej2-angular-inputs";
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';



@NgModule({
  declarations: [IntegrationSettingsComponent],
  imports: [
    CommonModule,
    DropDownListModule,
    FormsModule,
    ReactiveFormsModule,
    TextBoxModule,
    GridAllModule,
    CheckBoxModule,
    DatePickerAllModule,



    RouterModule.forChild([
      {
        path: "",
        component: IntegrationSettingsComponent,
        data: { breadcrumbs: ["Settings", "Integration Settings"] },
      },
    ]),
  ]
})
export class IntegrationSettingsModule { }
