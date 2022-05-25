import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { GridComponent, ToolbarItems } from "@syncfusion/ej2-angular-grids";
import * as _ from "lodash";
import { ToastrService } from "ngx-toastr";
import { IntegrationSettingsService } from "src/app/features/settings/integration-settings/integration-settings.service";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";
import { ItemsService } from "../items.service";

@Component({
  selector: "app-import-items",
  templateUrl: "./import-items.component.html",
})
export class ImportItemsComponent implements OnInit {
  @ViewChild("grid", { static: true }) grid: GridComponent;
  importHeaderForm: FormGroup;
  submitClickedMain: boolean = false;
  public toolbarExternal: ToolbarItems[] = ["Search"];
  public selectOptions: Object = { persistSelection: true };
  allNames: any[];
  names: any[];
  itemsList: any[];

  get name() {
    return this.importHeaderForm.get("name");
  }
  get company() {
    return this.importHeaderForm.get("company");
  }
  constructor(
    public formBuilder: FormBuilder,
    public syncfusionHelperService: SyncfusionHelperService,
    public integrationService: IntegrationSettingsService,
    public itemService: ItemsService,
    public toastr: ToastrService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getAllNames();
    this.importHeaderForm = this.createimportHeaderForm();
  }

  getAllNames() {
    this.integrationService.getAll().subscribe((resp: any) => {
      this.allNames = resp;
      this.names = resp.map(({ url, ...name }) => name);
      this.names = _.filter(this.names, function (name) {
        return name.version != "V0";
      });
    });
  }

  createimportHeaderForm() {
    return this.formBuilder.group({
      name: ["", [Validators.required]],
      company: [
        {
          value: "",
          disabled: true,
        },
      ],
    });
  }

  nameChange(event) {
    this.importHeaderForm.patchValue({ company: event.itemData?.companyId });
  }

  importData() {
    this.submitClickedMain = true;
    if (this.importHeaderForm.valid) {
      let selectedData = _.find(this.allNames, ["id", this.name.value]);
      let params = {
        url: selectedData.url,
        version: selectedData.version,
        xapiKey: selectedData.xapiKey,
      };
      this.itemService.importERPData(params).subscribe(
        (resp) => {
          this.itemsList = resp;
          this.itemsList.map((item) => {
            item.vatPercentage = 5;
          });
          this.itemsList = _.uniqBy(this.itemsList, "partNum");
        },
        (err) => {
          this.toastr.error("Failed to import Data");
        }
      );
    }
  }

  resetImport() {
    this.importHeaderForm.reset();
    this.itemsList = [];
  }

  saveData() {
    let payload = [];
    this.grid.getSelectedRecords().map((item: any) => {
      payload.push({
        code: item.partNum,
        itemCode: item.partNum,
        itemName: item.partDescription,
        description: item.partDescription,
        uomMasterId: item.uomMasterId,
        isBatchItem: false,
        storageTypeId: 0,
        itemDefaultPrice: 0,
        sequenceNumber: 0,
        vatPercentage: item.vatPercentage,
      });
    });
    if (payload.length) {
      this.itemService.saveERPData(payload).subscribe(
        (resp) => {
          this.toastr.success("Items Added Successfully");
          this.router.navigateByUrl("/masters/itemmaster");
        },
        (err) => {
          this.toastr.error("Failed to add Items");
        }
      );
    } else this.toastr.warning("Please select atleast one record");
  }
}
