import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';
import {NgSelectModule} from '@ng-select/ng-select';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ViewComponent } from './view/view.component';
import { BasicTableComponent } from './basic-table/basic-table.component';
import { CommonHeaderAreaComponent } from './common-header-area/common-header-area.component';
import { GridAllModule, GridModule } from '@syncfusion/ej2-angular-grids';
import { MaskedTextBoxModule, NumericTextBoxAllModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { AutoCompleteModule, DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { ViewPopupComponent } from './view-popup/view-popup.component';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@NgModule({
    declarations: [
    ViewComponent,
    BasicTableComponent,
    CommonHeaderAreaComponent,
    TextEditorComponent,
    ViewPopupComponent
  ],
    exports:[ViewComponent,BasicTableComponent,CommonHeaderAreaComponent,TextEditorComponent],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgBootstrapFormValidationModule,
        Ng2SearchPipeModule,
        BsDropdownModule,
        NgSelectModule,
        PipesModule,
        GridAllModule,
        GridModule,
        NumericTextBoxAllModule, 
        DropDownListAllModule,
        SwitchModule ,
        TextBoxModule,
        AutoCompleteModule ,
        RichTextEditorAllModule,
        AccordionModule,
        MaskedTextBoxModule,
      ],
      providers: [DatePipe]
    })
    export class SharedComponentModule { }