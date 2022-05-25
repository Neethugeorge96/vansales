import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  CommandClickEventArgs,
  CommandColumnService,
  CommandModel,
  EditService,
  EditSettingsModel,
  GridComponent,
  PageService,
  SaveEventArgs,
  ToolbarItems,
  ToolbarService,
} from "@syncfusion/ej2-angular-grids";
import { DialogUtility } from "@syncfusion/ej2-angular-popups";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { EmployeeMasterViewModel } from "../employee.model";
import {
  duplicateCodeValidator,
  duplicateIdValidator,
  duplicateNameValidator,
} from "src/app/shared/utils/validators.functions";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";
import { EmployeeService } from "../employee.service";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  providers: [PageService, EditService, ToolbarService, CommandColumnService],
})
export class EmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  @ViewChild("grid", { static: true }) grid: GridComponent;
  employeeList: EmployeeMasterViewModel[];
  employeeView: any;
  designationvalues: any[];
  cssValue = "e-filled e-outline";

  // alreadyUsed: { names: string[] } = {
  //   names: [],
  // };

  alreadyUsed: { names: string[]; email: string[]; phn: number[] } = {
    names: [],
    email: [],
    phn: [],
  };
  @ViewChild("content") modelPopup: any;
  submitClicked: boolean;
  public DialogObj;

  constructor(
    private toastr: ToasterServiceService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private employeeService: EmployeeService,
    public syncfusionHelperService: SyncfusionHelperService
  ) {}
  get employeeCode() {
    return this.employeeForm.get("employeeCode");
  }
  get code() {
    return this.employeeForm.get("code");
  }
  get employeeName() {
    return this.employeeForm.get("employeeName");
  }
  get designationId() {
    return this.employeeForm.get("designationId");
  }
  get target() {
    return this.employeeForm.get("target");
  }
  get incentive() {
    return this.employeeForm.get("incentive");
  }

  get email() {
    return this.employeeForm.get("email");
  }
  get mobileNumber() {
    return this.employeeForm.get("mobileNumber");
  }
  get isActive() {
    return this.employeeForm.get("isActive");
  }

  ngOnInit(): void {
    this.getEmployeeList();
    this.getDesignation();
  }
  getEmployeeList() {
    this.employeeService.getAll().subscribe(
      (result) => {
        this.employeeList = result;
        this.alreadyUsed = {
          names: result.map((data) => data["employeeName"].toLowerCase()),
          email: result.map((data) => data.email),
          phn: result.map((data: any) => data.mobileNumber),
        };
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the employee list");
      }
    );
  }

  getDesignation() {
    this.employeeService.getAllDesignation().subscribe((result) => {
      this.designationvalues = result;
    });
  }

  createFormGroup(employeeData?: any): FormGroup {
    this.cssValue = "e-filled e-outline";
    return this.formBuilder.group({
      id: [!employeeData ? 0 : employeeData.id],
      employeeCode: [
        {
          value: employeeData ? employeeData.employeeCode : "",
          disabled: true,
        },
        [],
      ],
      code: [
        {
          value: employeeData ? employeeData.code : "",
          disabled: true,
        },
        [],
      ],
      employeeName: [
        employeeData ? employeeData.employeeName : "",
        [
          Validators.required,
          Validators.maxLength(32),
          Validators.pattern(/^[a-zA-Z ]*$/),
          duplicateNameValidator(
            this.alreadyUsed.names.filter(
              (name) =>
                name !== (employeeData?.employeeName || "").toLowerCase()
            )
          ),
        ],
      ],
      // isAssigned: [employeeData.isAssigned || false],
      target: [
        employeeData ? employeeData.target : "",
        [Validators.max(9999999999)],
      ],
      designationId: [
        employeeData ? employeeData.designationId : "",
        [Validators.required],
      ],
      incentive: [
        employeeData ? employeeData.incentive : "",
        [Validators.max(9999999999), Validators.required],
      ],
      // achievement: [employeeData ? employeeData.achievement : ""],
      email: [
        employeeData ? employeeData.email : "",
        [
          Validators.maxLength(64),
          Validators.pattern(
            /^[\w%\+\-]+(\.[\w%\+\-]+)*@[\w%\+\-]+(\.[\w%\+\-]+)+$/
          ),
          // Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/),
          duplicateCodeValidator(
            this.alreadyUsed.email.filter(
              (code) => code !== employeeData?.email
            )
          ),
        ],
      ],
      mobileNumber: [
        employeeData ? employeeData.mobileNumber : "",
        [
          duplicateIdValidator(
            this.alreadyUsed.phn.filter(
              (code) => code != employeeData?.mobileNumber
            )
          ),
        ],
      ],

      isActive: [employeeData ? employeeData.isActive : true, []],
    });
  }

  commandClick(args: CommandClickEventArgs): void {
    if (args.commandColumn.buttonOption.content === "View") {
      this.employeeView = args.rowData;
      this.open(this.modelPopup);
    }
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", size: "xl" })
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
          ? "Edit Employee Details"
          : "Add Employee Details";
    }
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === "add") {
      this.submitClicked = false;
      this.employeeForm = this.createFormGroup();
    }
    if (args.requestType === "beginEdit") {
      this.submitClicked = false;
      this.employeeForm = this.createFormGroup();
      this.employeeService.getbyId(args.rowData).subscribe((response) => {
        this.employeeForm = this.createFormGroup(response);
      });
    }
    if (args.requestType === "save") {
      args.cancel = true;
      this.submitClicked = true;
      if (this.employeeForm.valid) {
        const insertdata = this.employeeForm.getRawValue();
        insertdata.isArchived = false;
        if (!insertdata.id) {
          this.employeeService.add(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage("Employee added successfully!");
                this.grid.closeEdit();
                this.getEmployeeList();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage("Unable to add employee");
            }
          );
        } else {
          this.employeeService.update(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage(
                  "Employee updated successfully!"
                );
                this.grid.closeEdit();
                this.getEmployeeList();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage("Unable to update employee");
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
    const [{ id, code, ...remainingData }, ...others] = data;
    this.DialogObj = DialogUtility.confirm({
      title: "Employee",
      content: `Are you sure you want to delete Employee <span style="color:red;font-weight:bold"> ${code} </span>?`,
      okButton: { text: "OK", click: this.okClickDelete.bind(this, id) },
      showCloseIcon: true,
      closeOnEscape: true,
      animationSettings: { effect: "Zoom" },
    });
  };

  okClickDelete(id): void {
    this.employeeService.delete(id).subscribe(
      (res) => {
        if (res) {
          res == -129
            ? this.toastr.showWarningMessage("Employee already used!")
            : this.toastr.showSuccessMessage("Employee deleted successfully!");
          this.DialogObj.hide();
          this.getEmployeeList();
        }
      },
      (error) => {
        console.error("err", error);
        this.toastr.showErrorMessage("Unable to delete the employee Details");
        this.DialogObj.hide();
      }
    );
  }

  mobileDuplicate(value) {
    if (this.employeeForm.controls["mobileNumber"].errors?.duplicate) {
      this.cssValue = "e-filled e-outline e-errors";
    } else this.cssValue = "e-filled e-outline";
  }
}
