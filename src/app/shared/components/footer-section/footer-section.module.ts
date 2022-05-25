// Angular Imports
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BoldReportViewerModule } from "@boldreports/angular-reporting-components";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {
  ButtonModule,
  RadioButtonModule,
} from "@syncfusion/ej2-angular-buttons";
import { DatePickerModule } from "@syncfusion/ej2-angular-calendars";
import { DropDownListModule } from "@syncfusion/ej2-angular-dropdowns";
import { GridModule } from "@syncfusion/ej2-angular-grids";
import {
  NumericTextBoxModule,
  TextBoxModule,
} from "@syncfusion/ej2-angular-inputs";
import { TabModule } from "@syncfusion/ej2-angular-navigations";
import { DialogModule } from "@syncfusion/ej2-angular-popups";
import { NgBootstrapFormValidationModule } from "ng-bootstrap-form-validation";
import { DirectivesModule } from "src/app/directives/directives.module";
import { SharedModule } from "../../shared.module";
import { SharedComponentsModule } from "../shared-components.module";

// This Module's Components
import { FooterSectionComponent } from "./footer-section.component";

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [FooterSectionComponent],
  exports: [FooterSectionComponent],
})
export class FooterSectionModule {}
