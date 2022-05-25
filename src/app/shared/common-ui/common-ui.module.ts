import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUiComponent } from './common-ui.component';
import { Routes } from '@angular/router';
import { CommonUiRoutingModule } from './common-ui-routing.module';
import { GridGroupingComponent } from './grid-grouping/grid-grouping.component';
import { GridAllModule, GridModule, EditService, ToolbarService, PageService } from '@syncfusion/ej2-angular-grids';
import { GridMenuComponent } from './grid-menu/grid-menu.component';
import { GridIconComponent } from './grid-icon/grid-icon.component';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import {TextBoxModule} from '@syncfusion/ej2-angular-inputs';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { LayoutComponent } from './layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CommonUiComponent,
    GridGroupingComponent,  
    CommonUiComponent,
    GridMenuComponent,
    GridIconComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    CommonUiRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GridModule,
    GridAllModule,
    NumericTextBoxAllModule, DatePickerAllModule, DropDownListAllModule,TextBoxModule,SwitchModule
  ],
  providers:[EditService, ToolbarService,EditService, ToolbarService,PageService]
})
export class CommonUiModule { }
