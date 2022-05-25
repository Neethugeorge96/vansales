import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  CommandClickEventArgs,
  GridComponent,
  SaveEventArgs,
} from "@syncfusion/ej2-angular-grids";
import { DialogUtility } from "@syncfusion/ej2-angular-popups";
import { FilteringEventArgs } from "@syncfusion/ej2-dropdowns";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";
import { dropDownformatter } from "src/app/shared/utils/common.functions";
import { EmployeeService } from "../../employee/employee.service";
import { userMaster } from "../user.model";
import { UserService } from "../user.service";
import { Query, Predicate } from "@syncfusion/ej2-data";
import {
  duplicateIdValidator,
  duplicateNameValidator,
} from "src/app/shared/utils/validators.functions";
import * as _ from "lodash";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  @ViewChild("grid", { static: true }) grid: GridComponent;
  empValue: any;
  userList: userMaster[];
  employeeList: any[];
  supervisorList: any[];
  branchList: any[];
  userView: any;
  showPwd: boolean = false;
  @ViewChild("content") modelPopup: any;
  submitClicked: boolean;
  passwordCheck: boolean = true;
  public DialogObj;
  alreadyUsed: { names: number[] } = {
    names: [],
  };

  constructor(
    private toastr: ToasterServiceService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public syncfusionHelperService: SyncfusionHelperService,
    private userService: UserService,
    private employeeService: EmployeeService
  ) {}

  get employeeId() {
    return this.userForm.get("employeeId");
  }
  get userName() {
    return this.userForm.get("userName");
  }
  get password() {
    return this.userForm.get("password");
  }
  get confirmPassword() {
    return this.userForm.get("confirmPassword");
  }
  get LineManagerId() {
    return this.userForm.get("lineManagerId");
  }
  get branchId() {
    return this.userForm.get("branchId");
  }
  get userStatus() {
    return this.userForm.get("userStatus");
  }
  get webAccess() {
    return this.userForm.get("webAccess");
  }
  get mobileAccess() {
    return this.userForm.get("mobileAccess");
  }
  get addCustomer() {
    return this.userForm.get("addCustomer");
  }
  get import() {
    return this.userForm.get("import");
  }
  get exportSalesDetails() {
    return this.userForm.get("exportSalesDetails");
  }
  get exportRemainingStock() {
    return this.userForm.get("exportRemainingStock");
  }

  ngOnInit(): void {
    this.getEmployeeList();
    this.getBranchList();
    this.getSupervisorList();
  }

  createFormGroup(userData?: any): FormGroup {
    return this.formBuilder.group({
      id: [!userData ? 0 : userData.id],
      employeeId: [
        userData ? userData.employeeId : "",
        [
          duplicateIdValidator(
            this.alreadyUsed.names.filter(
              (name) => name !== userData?.employeeId
            )
          ),
          Validators.required,
        ],
      ],
      userName: [
        userData ? userData.userName : "",
        [Validators.required, Validators.maxLength(36)],
      ],
      password: [
        userData ? userData.password : "",
        [
          Validators.required,
          Validators.pattern(
            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{0,}$"
          ),
          Validators.minLength(8),
        ],
      ],
      confirmPassword: [
        userData ? userData.confirmPassword : "",
        Validators.required,
      ],
      lineManagerId: [
        userData ? userData.lineManagerId : "",
        [Validators.required],
      ],
      // isAssigned: [itemData.isAssigned || false],
      branchId: [userData ? userData.branchId : "", Validators.required],
      userStatus: [userData ? userData.userStatus : true],
      webAccess: [userData ? userData.webAccess : false],
      mobileAccess: [userData ? userData.mobileAccess : false],
      addCustomer: [userData ? userData.addCustomer : false],
      import: [userData ? userData.import : false],
      exportSalesDetails: [userData ? userData.exportSalesDetails : false],
      exportRemainingStock: [userData ? userData.exportRemainingStock : false],
    });
  }

  getUserList() {
    this.userService.getAll().subscribe(
      (result) => {
        this.userList = result;
        this.alreadyUsed = {
          names: result.map(
            (data: any) =>
              _.find(this.employeeList, ["employeeName", data["employeeName"]])
                .id
          ),
        };
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the user list");
      }
    );
  }

  getEmployeeList() {
    this.employeeService.getAll().subscribe(
      (result) => {
        result = result.filter((x) => x.isActive == true);
        this.employeeList = dropDownformatter(result, "code", "employeeName");
        this.getUserList();
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the employee list");
      }
    );
  }

  getBranchList() {
    this.userService.getBranches().subscribe(
      (result) => {
        this.branchList = result;
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the branch list");
      }
    );
  }

  getSupervisorList() {
    this.userService.getSupervisors().subscribe((resp: any) => {
      this.supervisorList = dropDownformatter(resp, "code", "employeeName");
    });
  }

  commandClick(args: CommandClickEventArgs): void {
    if (args.commandColumn.buttonOption.content === "View") {
      this.userView = args.rowData;
      this.open(this.modelPopup);
    }
  }

  open(content: any) {
    this.showPwd = false;
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        () => {},
        () => {}
      );
  }

  actionComplete(args) {
    if (args.requestType === "beginEdit" || args.requestType === "add") {
      var cancelBtn =
        args.dialog.element.querySelector(".e-footer-content").children[1];
      if (cancelBtn) {
        cancelBtn.style.background = "grey";
        cancelBtn.style.color = "white";
      }
      args.dialog.width = "25%";
      args.dialog.headerEle.style.color = "#0366d6";
      const dialog = args.dialog;
      dialog.header =
        args.requestType === "beginEdit"
          ? "Edit User Details "
          : "Add User Details";
      (args.form.elements.namedItem("password") as HTMLInputElement).focus();
      (args.form.elements.namedItem("password") as HTMLInputElement).blur();
    }
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === "add") {
      this.submitClicked = false;
      this.userForm = this.createFormGroup();
    }
    if (args.requestType === "beginEdit") {
      this.submitClicked = false;
      this.userForm = this.createFormGroup();
      this.userService.getById(args.rowData).subscribe((result: any) => {
        for (var i = 0; i < result.branchId.length; i++)
          result.branchId[i] = +result.branchId[i];
        this.userForm = this.createFormGroup(result);
      });
    }
    if (args.requestType === "save") {
      args.cancel = true;
      this.submitClicked = true;
      if (this.userForm.valid && this.passwordCheck) {
        const insertdata = this.userForm.getRawValue();
        if (!insertdata.id) {
          this.userService.add(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage("User added successfully!");
                this.grid.closeEdit();
                this.getUserList();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage("Unable to add user ");
            }
          );
        } else {
          this.userService.update(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage("User updated successfully!");
                this.grid.closeEdit();
                this.getUserList();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage("Unable to update user ");
            }
          );
        }
      } else {
        args.cancel = true;
      }
    } else if (args.requestType === "delete") {
      args.cancel = true;
      this.onOpenDialogDelete(args.data);
    }
  }

  public onOpenDialogDelete = function (data: any): void {
    const [{ id, userName, ...remainingData }, ...others] = data;
    this.DialogObj = DialogUtility.confirm({
      title: "User",
      content: `Are you sure you want to delete User <span style="color:red;font-weight:bold"> ${userName} </span>?`,
      okButton: { text: "OK", click: this.okClickDelete.bind(this, id) },
      showCloseIcon: true,
      closeOnEscape: true,
      animationSettings: { effect: "Zoom" },
    });
  };

  okClickDelete(id): void {
    this.userService.delete(id).subscribe(
      (res) => {
        if (res) {
          this.toastr.showSuccessMessage("User deleted successfully!");
          this.DialogObj.hide();
          this.getUserList();
        }
      },
      (error) => {
        console.error("err", error);
        this.toastr.showErrorMessage("Unable to delete the user ");
        this.DialogObj.hide();
      }
    );
  }

  checkPasswords() {
    if (this.password.value && this.confirmPassword.value)
      this.passwordCheck = this.password.value === this.confirmPassword.value;
  }
}
