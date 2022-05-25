import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  CommandClickEventArgs,
  GridComponent,
  SaveEventArgs,
} from "@syncfusion/ej2-angular-grids";
import { DialogUtility } from "@syncfusion/ej2-angular-popups";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";
import { dropDownformatter } from "src/app/shared/utils/common.functions";
import { EmployeeService } from "../../masters/employee/employee.service";
import { RouteService } from "../../masters/route/route.service";
import { VanmasterService } from "../../masters/vanmaster/vanmaster.service";
import { assignmentMaster } from "../assignment.model";
import { AssignmentService } from "../assignment.service";
import * as _ from "lodash";
import * as moment from "moment";
import { duplicateIdValidator } from "src/app/shared/utils/validators.functions";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: "app-assignment",
  templateUrl: "./assignment.component.html",
})
export class AssignmentComponent implements OnInit {
  assignmentForm: FormGroup;
  @ViewChild("grid", { static: true }) grid: GridComponent;
  assignmentList: assignmentMaster[];
  assignmentView: any;
  routeList: any[] = [];
  allRouteList: any[];
  allVanList: any[];
  allEmployeeList: any[];
  employeeList: any[];
  vanList: any[];
  minDate: any = moment().toDate();
  alreadyUsed: { routes: number[]; van: number[]; employee: number[] } = {
    routes: [],
    van: [],
    employee: [],
  };
  @ViewChild("content") modelPopup: any;
  submitClicked: boolean;
  public DialogObj;

  constructor(
    private toastr: ToasterServiceService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private assignmentService: AssignmentService,
    public syncfusionHelperService: SyncfusionHelperService,
    private routeService: RouteService,
    private vanService: VanmasterService,
    private employeeService: EmployeeService
  ) {}

  get routeId() {
    return this.assignmentForm.get("routeId");
  }
  get vanId() {
    return this.assignmentForm.get("vanId");
  }
  get employeeId() {
    return this.assignmentForm.get("employeeId");
  }
  get assignmentDate() {
    return this.assignmentForm.get("assignmentDate");
  }

  ngOnInit(): void {
    this.getRoutes();
  }

  getAssignmentList() {
    this.assignmentService.getAll().subscribe(
      (result) => {
        this.assignmentList = result;
        this.alreadyUsed = {
          routes: result.map((data: any) =>
            data.isActive
              ? _.find(this.routeList, ["routeName", data["routeName"]])?.id
              : 0
          ),
          van: result.map((data: any) =>
            data.isActive
              ? _.find(this.vanList, ["vanNumber", data["vanNumber"]])?.id
              : 0
          ),
          employee: result.map((data: any) =>
            data.isActive
              ? _.find(this.employeeList, [
                  "employeeName",
                  data["employeeName"],
                ])?.id
              : 0
          ),
        };
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the assignment list");
      }
    );
  }

  getRoutes() {
    // this.assignmentService.getRoutes().subscribe((result) => {
    //   this.routeList = dropDownformatter(result, "routeNo", "routeName");
    let params = new HttpParams();
    params = params.append("customerId", "0");
    params = params.append("branchId", "0");
    this.routeService.getAll(params).subscribe((resp) => {
      this.allRouteList = resp;
    });
    this.getVanlist();
    // });
  }

  getVanlist() {
    // this.assignmentService.getVan().subscribe((result) => {
    //   this.vanList = dropDownformatter(result, "vanNumber", "vanModel");
    this.vanService.getAll().subscribe((resp) => {
      this.allVanList = resp;
    });

    this.getEmployees();
    // });
  }

  getEmployees() {
    // this.assignmentService.getEmployees().subscribe((result) => {
    //   this.employeeList = dropDownformatter(result, "code", "employeeName");
    this.employeeService.getAll().subscribe((resp) => {
      this.allEmployeeList = resp;
    });
    this.getAssignmentList();
    // });
  }

  createFormGroup(assignmentData?: any): FormGroup {
    if (assignmentData)
      this.minDate = moment(assignmentData.assignmentDate).toDate();
    return this.formBuilder.group({
      id: [!assignmentData ? 0 : assignmentData.id],
      routeId: [
        assignmentData ? assignmentData.routeId : "",
        [
          Validators.required,
          duplicateIdValidator(
            this.alreadyUsed.routes.filter(
              (name) => name !== assignmentData?.routeId
            )
          ),
        ],
      ],
      vanId: [
        assignmentData ? assignmentData.vanId : "",
        [
          Validators.required,
          duplicateIdValidator(
            this.alreadyUsed.van.filter(
              (name) => name !== assignmentData?.vanId
            )
          ),
        ],
      ],
      employeeId: [
        assignmentData ? assignmentData.employeeId : "",
        [
          Validators.required,
          duplicateIdValidator(
            this.alreadyUsed.employee.filter(
              (name) => name !== assignmentData?.employeeId
            )
          ),
        ],
      ],
      isActive: [assignmentData ? assignmentData.isActive : true],
      assignmentDate: [
        assignmentData
          ? moment(assignmentData.assignmentDate).format("DD/MM/YYYY")
          : moment().format("DD/MM/YYYY"),
        [Validators.required],
      ],
    });
  }

  commandClick(args: CommandClickEventArgs): void {
    if (args.commandColumn.buttonOption.content === "View") {
      this.assignmentView = args.rowData;
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
      args.dialog.headerEle.style.color = "#0366d6";
      args.dialog.width = "25%";
      const dialog = args.dialog;
      dialog.header =
        args.requestType === "beginEdit"
          ? "Edit Assignment Details"
          : "Add Assignment Details";
    }
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === "add") {
      this.submitClicked = false;
      this.assignmentService.getRoutes().subscribe((resp) => {
        this.routeList = resp;
        this.routeList = dropDownformatter(
          this.routeList,
          "routeNo",
          "routeName"
        );
      });
      this.assignmentService.getVan().subscribe((response) => {
        this.vanList = response;
        this.vanList = dropDownformatter(this.vanList, "vanNumber", "vanModel");
      });
      this.assignmentService.getEmployees().subscribe((result) => {
        this.employeeList = result;
        this.employeeList = dropDownformatter(
          this.employeeList,
          "code",
          "employeeName"
        );
      });
      this.assignmentForm = this.createFormGroup();
    }
    if (args.requestType === "beginEdit") {
      this.submitClicked = false;
      this.updateDropdowns(args.rowData);
      this.assignmentForm = this.createFormGroup();
    }
    if (args.requestType === "save") {
      args.cancel = true;
      this.submitClicked = true;
      if (this.assignmentForm.valid) {
        const insertdata = this.assignmentForm.getRawValue();
        insertdata.assignmentDate = moment(
          insertdata.assignmentDate,
          "DD/MM/YYYY"
        ).format("YYYY/MM/DD");
        insertdata.isArchived = false;
        if (!insertdata.id) {
          this.assignmentService.add(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage(
                  "Assignment added successfully!"
                );
                this.grid.closeEdit();
                this.getAssignmentList();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage("Unable to add assignment");
            }
          );
        } else {
          this.assignmentService.update(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage(
                  "Assignment updated successfully!"
                );
                this.grid.closeEdit();
                this.getAssignmentList();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage("Unable to update assignment");
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
    const [{ id, assignmentDate, ...remainingData }, ...others] = data;
    this.DialogObj = DialogUtility.confirm({
      title: "Assignment",
      content: `Are you sure you want to delete this Assignment  <span style="color:red;font-weight:bold"> </span>?`,
      okButton: { text: "OK", click: this.okClickDelete.bind(this, id) },
      showCloseIcon: true,
      closeOnEscape: true,
      animationSettings: { effect: "Zoom" },
    });
  };

  okClickDelete(id): void {
    this.assignmentService.delete(id).subscribe(
      (res) => {
        if (res) {
          res == -129
            ? this.toastr.showWarningMessage("Assignment already used!")
            : this.toastr.showSuccessMessage(
                "Assignment deleted successfully!"
              );
          this.DialogObj.hide();
          this.getAssignmentList();
        }
      },
      (error) => {
        console.error("err", error);
        this.toastr.showErrorMessage("Unable to delete the assignment");
        this.DialogObj.hide();
      }
    );
  }

  getRouteNo(routeName) {
    let route = this.allRouteList.find((x) => x.routeName == routeName);
    return route?.routeNo;
  }

  updateDropdowns(editData) {
    this.assignmentService.getRoutes().subscribe((resp) => {
      this.routeList = resp;
      this.routeList.push(
        _.find(this.allRouteList, ["routeName", editData["routeName"]])
      );
      this.routeList = dropDownformatter(
        this.routeList,
        "routeNo",
        "routeName"
      );

      this.assignmentService.getVan().subscribe((resp1) => {
        this.vanList = resp1;
        this.vanList.push(
          _.find(this.allVanList, ["vanNumber", editData["vanNumber"]])
        );
        this.vanList = dropDownformatter(this.vanList, "vanNumber", "vanModel");
        this.vanList = _.uniqBy(this.vanList, "id");

        this.assignmentService.getEmployees().subscribe((resp2) => {
          this.employeeList = resp2;
          this.employeeList.push(
            _.find(this.allEmployeeList, [
              "employeeName",
              editData["employeeName"],
            ])
          );
          this.employeeList = dropDownformatter(
            this.employeeList,
            "code",
            "employeeName"
          );

          this.assignmentService.getbyId(editData).subscribe((response) => {
            this.assignmentForm = this.createFormGroup(response);
          });
        });
      });
    });
  }
}
