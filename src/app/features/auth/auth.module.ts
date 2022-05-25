import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { CheckBoxModule } from "@syncfusion/ej2-angular-buttons";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    CheckBoxModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path:'',redirectTo :'login',pathMatch:"full"
      },
      {
        path: "login",
        component: LoginComponent,
      },
    ]),
  ],
})
export class AuthModule {}
