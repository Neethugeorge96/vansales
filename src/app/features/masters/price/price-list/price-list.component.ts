import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EmitType } from "@syncfusion/ej2-base";
import {
  CommandClickEventArgs,
  GridComponent,
  SaveEventArgs,
  ToolbarItems,
} from "@syncfusion/ej2-angular-grids";
import { DialogComponent, DialogUtility } from "@syncfusion/ej2-angular-popups";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";
import { PriceListMasterViewModel } from "../price.model";
import { PriceService } from "../price.service";
import { ItemsService } from "../../items/items.service";
import { dropDownformatter } from "src/app/shared/utils/common.functions";
@Component({
  selector: "app-price-list",
  templateUrl: "./price-list.component.html",
})
export class PriceListComponent implements OnInit {
  @ViewChild("grid", { static: true }) grid: GridComponent;
  @ViewChild("ejDialog") ejDialog: DialogComponent;
  priceList: PriceListMasterViewModel[];
  activepriceList: PriceListMasterViewModel[];
  items: any;
  uomList: any;
  public DialogObj;
  public toolbarExternal: ToolbarItems[] | object;
  public position: object = { X: "right", Y: "top" };
  public targetElement: HTMLElement;
  showDialog: boolean = false;
  priceUpdateForm: FormGroup;
  submitClicked: boolean = false;

  public validation(event: any): void {
    if (this.showDialog) {
      event.cancel = false;
    } else {
      event.cancel = true;
    }
  }

  public onOverlayClick: EmitType<object> = () => {
    this.showDialog = false;
    this.ejDialog.hide();
  };

  constructor(
    private toastr: ToasterServiceService,
    private formBuilder: FormBuilder,
    public syncfusionHelperService: SyncfusionHelperService,
    public priceService: PriceService,
    public itemService: ItemsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  get itemId() {
    return this.priceUpdateForm.get("itemId");
  }
  get price() {
    return this.priceUpdateForm.get("price");
  }
  get priceLists() {
    return this.priceUpdateForm.get("priceLists");
  }

  ngOnInit(): void {
    this.getPriceList();
    this.getItems();
    this.getUom();
    this.toolbarExternal = [
      "Add",
      "Search",
      {
        text: "Update",
        tooltipText: "Update",
        prefixIcon: "e-edit",
        id: "Update",
      },
    ];
  }

  getItems() {
    this.itemService.getAll().subscribe(
      (result) => {
        this.items = dropDownformatter(result, "code", "itemName");
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the Items");
      }
    );
  }

  getUom() {
    this.itemService.getUom().subscribe((result) => {
      this.uomList = result;
    });
  }

  getPriceList() {
    this.priceService.getAll().subscribe(
      (result) => {
        this.priceList = result;
        this.activepriceList = result.filter((x) => x.isActive == true);
        this.activepriceList.map((item: any) => {
          item.displayText = item.priceCode + "-" + item.priceListName;
        });
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the Price list");
      }
    );
  }

  commandClick(args: CommandClickEventArgs): void {
    const rowArgs: any = args;

    if (args.commandColumn.buttonOption.content === "View") {
      console.log(rowArgs);

      this.router.navigate(["./view", rowArgs.rowData.id], {
        relativeTo: this.activatedRoute,
      });
    }
  }

  clickHandler(args): void {
    if (args.item.id === "Update") {
      this.priceUpdateForm = this.createFormGroup();
      this.showDialog = true;
      this.ejDialog.show();
      // this.addRecord()
    }
  }

  actionBegin(args: SaveEventArgs): void {
    const rowArgs: any = args.rowData;
    if (args.requestType === "add") {
      this.router.navigate(["./create"], { relativeTo: this.activatedRoute });
    }
    if (args.requestType === "beginEdit") {
      this.router.navigate(["./edit", rowArgs.id], {
        relativeTo: this.activatedRoute,
      });
    } else if (args.requestType === "delete") {
      args.cancel = true;
      this.onOpenDialogDelete(args.data);
    }
  }

  public onOpenDialogDelete = function (data: any): void {
    const [{ id, priceCode, ...remainingData }, ...others] = data;
    this.DialogObj = DialogUtility.confirm({
      title: "Price List",
      content: `Are you sure you want to delete this Price List<span style="color:red;font-weight:bold"> ${priceCode} </span>?`,
      okButton: { text: "OK", click: this.okClickDelete.bind(this, id) },
      showCloseIcon: true,
      closeOnEscape: true,
      animationSettings: { effect: "Zoom" },
    });
  };

  okClickDelete(id): void {
    this.priceService.delete(id).subscribe(
      (res) => {
        if (res) {
          this.toastr.showSuccessMessage("Price List deleted successfully!");
          this.DialogObj.hide();
          this.getPriceList();
        }
      },
      (error) => {
        console.error("err", error);
        this.toastr.showErrorMessage("Unable to delete the Price List");
        this.DialogObj.hide();
      }
    );
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      itemId: ["", [Validators.required]],
      price: ["", [Validators.required]],
      priceLists: ["", [Validators.required]],
    });
  }

  savePriceList() {
    this.submitClicked = true;
    if (this.priceUpdateForm.valid) {
      let payload = this.priceUpdateForm.value;
      payload.priceList = payload.priceLists;
      delete payload.priceLists;
      let itemData = this.items.find((x) => x.id == payload.itemId);
      let uom = this.uomList.find((x) => x.code == itemData.uom);
      payload.uomMasterId = uom.id;
      this.priceService.bulkUpdate(payload).subscribe(
        (response: any) => {
          this.toastr.showSuccessMessage("Price Lists updated successfully!");
          this.ejDialog.hide();
        },
        (error) => {
          console.error("err", error);
          this.toastr.showErrorMessage("Unable to update Price Lists");
        }
      );
    }
  }
}
