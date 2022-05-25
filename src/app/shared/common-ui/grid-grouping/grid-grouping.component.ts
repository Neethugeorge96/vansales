import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, GroupSettingsModel, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid-grouping',
  templateUrl: './grid-grouping.component.html',
})
export class GridGroupingComponent implements OnInit {

  dataMain = [
    {
      "id": 1,
      "purchaserequestnumber": "PR-1401",
      "purchaserequestdate": "2020-09-28T07:00:35.185",
      "purchasestatus": 0,
      "linenumber": 1,
      "requestquantity": 10,
      "itemname": "Item 1",
      "isnewitem": true,
      "itemCommodityCode": null
    },
    {
      "id": 1,
      "purchaserequestnumber": "PR-1401",
      "purchaserequestdate": "2020-09-28T07:00:35.185",
      "purchasestatus": 0,
      "linenumber": 2,
      "requestquantity": 10,
      "itemname": "Item 2",
      "isnewitem": true,
      "itemCommodityCode": 'Comm2'
    },
    {
      "id": 1,
      "purchaserequestnumber": "PR-1401",
      "purchaserequestdate": "2020-09-28T07:00:35.185",
      "purchasestatus": 0,
      "linenumber": 3,
      "requestquantity": 10,
      "itemname": "item 34",
      "isnewitem": false,
      "itemCommodityCode": 'Comm2'
    },
    {
      "id": 2,
      "purchaserequestnumber": "PR-1784",
      "purchaserequestdate": "2020-09-28T07:48:35.167",
      "purchasestatus": 0,
      "linenumber": 1,
      "requestquantity": 10,
      "itemname": "item 111",
      "isnewitem": false,
      "itemCommodityCode": 'Comm1'
    },
    {
      "id": 2,
      "purchaserequestnumber": "PR-1784",
      "purchaserequestdate": "2020-09-28T07:48:35.167",
      "purchasestatus": 0,
      "linenumber": 2,
      "requestquantity": 10,
      "itemname": "item 111",
      "isnewitem": false,
      "itemCommodityCode": 'Comm1'
    }
  ];

   //sync fusion
   public data: Object[];
   public groupOptions: GroupSettingsModel;
   public pageSettings: Object;
   public refresh: Boolean;
   @ViewChild('grid')
   public grid: GridComponent;
   @ViewChild('alertDialog')
   public alertHeader: string = 'Grouping';
   public hidden: Boolean = false;
   public target: string = '.control-section';
   public alertWidth: string = '300px';
   public alertContent: string = 'Grouping is disabled for this column';
   public showCloseIcon: Boolean = false;
   public animationSettings: Object = { effect: 'None' };
   public selectOptions: Object;
   public editSettings: Object;

  constructor() { }

  ngOnInit(): void {
     this.data = this.dataMain;
     this.groupOptions = { showGroupedColumn: false, columns: ['itemCommodityCode'], };
     this.pageSettings = { pageCount: 5 };
     this.selectOptions = { persistSelection: true };
     this.editSettings = { allowDeleting: true };
  }

  dataBound() {
    if(this.refresh){
        this.grid.groupColumn('itemCommodityCode');
        this.refresh =false;
    }
  }
  load() {
      this.refresh = (<any>this.grid).refreshing;
  }

  created() {
      this.grid.on("columnDragStart", this.columnDragStart, this);
  }

  public columnDragStart(args: any) {
      if(args.column.field === "Mainfieldsofinvention"){
          //this.alertDialog.show();
    }
  }

  // selected rows
  rowSelected(args: RowSelectEventArgs) {
    const selectedrowindex: number[] = this.grid.getSelectedRowIndexes();  // Get the selected row indexes.
    const selectedrecords: object[] = this.grid.getSelectedRecords();  // Get the selected records.
  }

  // Deseleted rows
  rowDeselected(args: RowSelectEventArgs) {
    const selectedrowindex: number[] = this.grid.getSelectedRowIndexes();  // Get the selected row indexes.
    const selectedrecords: object[] = this.grid.getSelectedRecords();  // Get the selected records.
  }

}
