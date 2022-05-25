import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReasonComponent } from './reason/reason.component';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SplitByUpperCasePipe } from 'src/app/pipes/split-by-upper-case.pipe';



@NgModule({
  declarations: [ReasonComponent],
  providers : [SplitByUpperCasePipe],
  imports: [
    CommonModule,
    GridAllModule,
    DropDownListModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: ReasonComponent,
        data: { breadcrumbs: ["Masters", "Reason"] },
      },
    ])
  ],
})
export class ReasonModule { }
