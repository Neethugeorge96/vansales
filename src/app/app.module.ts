import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  NgBootstrapFormValidationModule,
  CUSTOM_ERROR_MESSAGES,
} from "ng-bootstrap-form-validation";

import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { PipesModule } from "./pipes/pipes.module";
import { JwtInterceptor } from "./services/auth/jwt.interceptor";
import { AppRoutingModule } from "./app-routing.module";
import { customErrorMessages } from "./shared/utils/utils.functions";
import { GridAllModule, SortService } from "@syncfusion/ej2-angular-grids";
import { ToolbarModule } from "@syncfusion/ej2-angular-navigations";
import { DialogModule } from "@syncfusion/ej2-angular-popups";
import { ButtonModule, SwitchModule } from "@syncfusion/ej2-angular-buttons";
import { MaskedTextBoxModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from "@syncfusion/ej2-angular-dropdowns";
import { NgxUiLoaderConfig, NgxUiLoaderModule } from "ngx-ui-loader";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "blue",
  fgsColor: "blue",
  pbColor: "blue",
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    GridAllModule,
    ToolbarModule,
    TextBoxModule,
    DialogModule,
    ButtonModule,
    MaskedTextBoxModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    DropDownListModule,
    ToastrModule.forRoot(),
    PipesModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    SwitchModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: CUSTOM_ERROR_MESSAGES,
      useValue: customErrorMessages,
      multi: true,
    },
    SortService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
