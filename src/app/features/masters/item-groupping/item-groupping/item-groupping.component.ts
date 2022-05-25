import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  GridComponent,
  CommandClickEventArgs,
  SaveEventArgs,
} from "@syncfusion/ej2-angular-grids";
import { DialogUtility } from "@syncfusion/ej2-popups";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";
import { duplicateNameValidator } from "src/app/shared/utils/validators.functions";
import { ItemsService } from "../../items/items.service";
import { ItemGroupings } from "../item-groupping.model";
import { ItemGrouppingService } from "../item-groupping.service";

@Component({
  selector: "app-item-groupping",
  templateUrl: "./item-groupping.component.html",
})
export class ItemGrouppingComponent implements OnInit {
  itemGroupForm: FormGroup;
  @ViewChild("grid", { static: true }) grid: GridComponent;
  itemgroupingsList: ItemGroupings[];
  itemGroupView: any;
  items: any[];
  alreadyUsed: { names: string[] } = {
    names: [],
  };
  @ViewChild("content") modelPopup: any;
  submitClicked: boolean;
  public DialogObj;

  constructor(
    private toastr: ToasterServiceService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private itemsService: ItemsService,
    public syncfusionHelperService: SyncfusionHelperService,
    public itemGroupingService: ItemGrouppingService
  ) {}

  get code() {
    return this.itemGroupForm.get("code");
  }
  get name() {
    return this.itemGroupForm.get("name");
  }
  get itemId() {
    return this.itemGroupForm.get("itemId");
  }

  ngOnInit(): void {
    this.getAllItems();
    this.getallItemGroupings();
  }

  getAllItems() {
    this.itemsService.getAll().subscribe(
      (result) => {
        this.items = result;
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the items list");
      }
    );
  }

  getallItemGroupings() {
    this.itemGroupingService.getAll().subscribe((result) => {
      this.itemgroupingsList = result;
      this.alreadyUsed = {
        names: result.map((data) => data["name"].toLowerCase()),
      };
    });
  }

  createFormGroup(itemGroupData?: any): FormGroup {
    return this.formBuilder.group({
      id: [!itemGroupData ? 0 : itemGroupData.id],
      code: [
        { value: itemGroupData ? itemGroupData.code : "", disabled: true },
        [],
      ],
      name: [
        itemGroupData ? itemGroupData.name : "",
        [
          Validators.required,
          Validators.maxLength(32),
          duplicateNameValidator(
            this.alreadyUsed.names.filter(
              (name) => name !== (itemGroupData?.name || "").toLowerCase()
            )
          ),
        ],
      ],
      itemId: [
        itemGroupData ? itemGroupData.itemId : "",
        [Validators.required],
      ],
    });
  }

  commandClick(args: CommandClickEventArgs): void {
    if (args.commandColumn.buttonOption.content === "View") {
      this.itemGroupView = args.rowData;
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
          ? "Edit Item Grouping"
          : "Add Item Grouping";
    }
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === "add") {
      this.submitClicked = false;
      this.itemGroupForm = this.createFormGroup();
    }
    if (args.requestType === "beginEdit") {
      this.submitClicked = false;
      this.itemGroupForm = this.createFormGroup();
      this.itemGroupingService
        .getbyId(args.rowData)
        .subscribe((response: any) => {
          for (var i = 0; i < response.itemId.length; i++)
            response.itemId[i] = +response.itemId[i];
          this.itemGroupForm = this.createFormGroup(response);
        });
    }
    if (args.requestType === "save") {
      args.cancel = true;
      this.submitClicked = true;
      if (this.itemGroupForm.valid) {
        const insertdata = this.itemGroupForm.getRawValue();
        if (!insertdata.id) {
          this.itemGroupingService.add(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage(
                  "Item Grouping added successfully!"
                );
                this.grid.closeEdit();
                this.getallItemGroupings();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage("Unable to add item grouping");
            }
          );
        } else {
          this.itemGroupingService.update(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage(
                  "Item Grouping updated successfully!"
                );
                this.grid.closeEdit();
                this.getallItemGroupings();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage("Unable to update item grouping");
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
      title: "Item Grouping",
      content: `Are you sure you want to delete the Item Grouping <span style="color:red;font-weight:bold"> ${code} </span>?`,
      okButton: { text: "OK", click: this.okClickDelete.bind(this, id) },
      showCloseIcon: true,
      closeOnEscape: true,
      animationSettings: { effect: "Zoom" },
    });
  };

  okClickDelete(id): void {
    this.itemGroupingService.delete(id).subscribe(
      (res) => {
        if (res) {
          this.toastr.showSuccessMessage("Item Grouping deleted successfully!");
          this.DialogObj.hide();
          this.getallItemGroupings();
        }
      },
      (error) => {
        console.error("err", error);
        this.toastr.showErrorMessage(
          "Unable to delete the Item Grouping Details"
        );
        this.DialogObj.hide();
      }
    );
  }
}
