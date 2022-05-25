import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './location/location.component';


import { RouterModule } from "@angular/router";
import { CheckBoxModule } from "@syncfusion/ej2-angular-buttons";
import { GridAllModule } from "@syncfusion/ej2-angular-grids";
import { DropDownListModule } from "@syncfusion/ej2-angular-dropdowns";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';



@NgModule({
  declarations: [LocationComponent],
  imports: [
    CommonModule,
    GridAllModule,
    DropDownListModule,
    ReactiveFormsModule,
    TextBoxModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: LocationComponent,
        data: { breadcrumbs: ["Masters", "Location"] },
      },
    ])
  ],

})
export class LocationModule { }
