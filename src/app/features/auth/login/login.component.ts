import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { AuthServiceService } from "../auth-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitClicked: boolean = false;
  fieldTextType: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private toastr: ToasterServiceService,
    private router: Router
  ) {}

  get username() {
    return this.loginForm.get("username");
  }
  get password() {
    return this.loginForm.get("password");
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm() {
    return this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  login() {
    this.submitClicked = true;
    if (this.loginForm.valid) {
      this.authService.get(this.loginForm.value).subscribe(
        (res: any) => {
          if (res) {
            this.toastr.showSuccessMessage("login succesfull");
            this.router.navigateByUrl("");
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("employeeId", res.employeeId);
          }
        },
        (error) => {
          console.log(error);

          this.toastr.showErrorMessage("failed to login");
        }
      );
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
