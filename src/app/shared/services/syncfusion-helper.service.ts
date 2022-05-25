import { Injectable } from "@angular/core";
// import { FinancialYearAllocationService } from "@settings/financial-year-allocation/company-financial-year.service";
// import { CompanyFinancialYearPeriod } from "@settings/financial-year-allocation/company-financial-year-period.model";
import { RenderDayCellEventArgs } from "@syncfusion/ej2-angular-calendars";
import {
  ToolbarItems,
  EditSettingsModel,
  CommandModel,
  GridComponent,
  PageSettingsModel,
} from "@syncfusion/ej2-angular-grids";
import { Tooltip } from "@syncfusion/ej2-angular-popups";
import { Query, Predicate } from "@syncfusion/ej2-data";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";

@Injectable({
  providedIn: "root",
})
export class SyncfusionHelperService {
  constructor(private toastr: ToasterServiceService) {}

  grid: GridComponent; // declared here only for grid (created) event

  public minDate: Object = new Date(1900, 1, 1);
  public maxDate: Object = new Date();
  //closedPeriods: CompanyFinancialYearPeriod[];

  // Grid pagination settings
  initialPage: PageSettingsModel = { pageSize: 20 };
  headerPage: PageSettingsModel = { pageSize: 15 };

  customAttributes = { class: "sno_column" };

  // row height settings
  height = 24;

  tabAnimationSettings = {
    next: { effect: "None" },
    previous: { effect: "None" },
  };

  dateFormat = { type: "date", format: "dd-MM-yy" };
  percentageFormat = "##.00 '%'";

  toolbarExternal: ToolbarItems[] = ["Add", "Search"];
  toolbarInline: ToolbarItems[] = [
    "Delete",
    "Cancel",
    "Update",
    "Edit",
    "Add",
    "Search",
  ];

  editExternal: EditSettingsModel = {
    //showDeleteConfirmDialog: true,
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    //mode: "Normal",
    mode: "Dialog",
    allowEditOnDblClick: false,
  };

  editInline: EditSettingsModel = {
    showDeleteConfirmDialog: false,
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    mode: "Normal",
    allowEditOnDblClick: true,
    newRowPosition: "Top",
  };

  commands: CommandModel[] = [
    { buttonOption: { content: "View", cssClass: "e-flat btn-view" } },
    {
      type: "Edit",
      buttonOption: { cssClass: "e-flat", iconCss: "e-icons e-edit" },
    },
    // { buttonOption: { content: "Print", cssClass: "e-flat btn-print" } },
    {
      type: "Delete",
      buttonOption: { cssClass: "e-flat", iconCss: "e-icons e-delete" },
    },
  ];

  sortOptions = {
    columns: [{ field: "lineNumber", direction: "Ascending" }],
  };

  transactionSortOptions = {
    columns: [{ field: "debitAmount", direction: "Descending" }],
  };

  allowPaginations(length: number, max?: number) {
    return length > max;
  }

  created(grid) {
    this.grid = grid;
    var gridElement = grid.element;
    var span = document.createElement("span");
    span.className = "e-clear-icon";
    span.id = gridElement.id + "clear";
    span.onclick = this.cancelBtnClick.bind(this);
    gridElement
      .querySelector(".e-toolbar-item .e-input-group")
      .appendChild(span);
    grid.element
      .querySelector(".e-search .e-input")
      .setAttribute("autocomplete", "off");
  }

  cancelBtnClick(args) {
    this.grid.searchSettings.key = "";
    (
      this.grid.element.querySelector(".e-input-group.e-search .e-input") as any
    ).value = "";
  }

  headerCellInfo(args) {
    const toolcontent = args.cell.column.headerText;
    const tooltip: Tooltip = new Tooltip({
      content: toolcontent,
    });
    tooltip.appendTo(args.node);
  }

  public onFiltering(e, dataSource, field1, field2) {
    let predicate = new Predicate(field1, "contains", e.text, true);
    predicate = predicate.or(field2, "contains", e.text, true);

    // if (e.text.length < 3) {
    //   return;
    // }

    let query: Query = new Query();
    query = e.text !== "" ? query.where(predicate) : query;
    e.updateData(dataSource, query);
  }

  // getOpenDates() {
  //   this.financialYearService
  //     .getCurrentFinancialYearStatus()
  //     .subscribe((res) => {
  //       if (res) {
  //         this.closedPeriods = res.financialYearPeriod;
  //         this.minDate = new Date(res.startDate);
  //         this.maxDate = new Date(res.endDate);
  //       }
  //     });
  // }

  // public onRenderCell(args: RenderDayCellEventArgs): void {
  //   if (this.closedPeriods) {
  //     for (let period of this.closedPeriods) {
  //       if (
  //         args.date >= new Date(period.fromDate) &&
  //         args.date <= new Date(period.toDate)
  //       ) {
  //         args.isDisabled = true;
  //       }
  //     }
  //   }
  // }

  public rowDataBound(args, grid, index): void {
    this.grid = grid;
    // Row index
    var rowIndex = parseInt(args.row.getAttribute("aria-rowIndex"));
    var page = this.grid.pageSettings.currentPage - 1;
    // Gets the total page size
    var totalPages = this.grid.pageSettings.pageSize;
    // Start index based on current start page
    var startIndex = page * totalPages;
    // Generate index number by adding the row index with the current page’s start index value
    var Sno = startIndex + (rowIndex + 1);
    args.row.cells[index].innerText = Sno;
  }

  getGridHeight(data, max, height) {
    return data.length <= max ? "auto" : height;
  }

  inlineGridLoad(grid) {
    var dialog = (document.getElementById(grid.element.id + "EditAlert") as any)
      .ej2_instances[0];
    dialog.beforeOpen = function (args) {
      if (args.element.innerText.includes("edit")) {
        args.cancel = true;
        this.toastr.showWarningMessage(
          "No Records selected for edit operation"
        );
      }
      if (args.element.innerText.includes("delete")) {
        args.cancel = true;
        this.toastr.showWarningMessage(
          "No Records selected for delete operation"
        );
      }
    }.bind(this);
  }

  load(grid) {
    // (grid.localeObj as any).currentLocale.CancelButton = "Clear";
    grid.localeObj.currentLocale.Search = "";
  }
}
