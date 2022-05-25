import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommandModel, DialogEditEventArgs, EditSettingsModel, SaveEventArgs, ToolbarItems } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid-icon',
  templateUrl: './grid-icon.component.html',
})
export class GridIconComponent implements OnInit {
  supplierQuoteList=[
    {
      "requestForQuoteBucketNumber": "RFQ5",
      "supplierCode": "S1",
      "quoteReceivedDate": "2020-10-01T18:30:00",
      "revision": "10",
    },
    {
      "requestForQuoteBucketNumber": "RFQ6",
      "supplierCode": "S2",
      "quoteReceivedDate": "2020-11-01T18:30:00",
      "revision": "11",
    },
]
public data: Object[];
public pageSettings: Object;
public toolbarOptions: ToolbarItems[];
public commands: CommandModel[] = [
  { type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' } },
  { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' } },
  { type: 'Save', buttonOption: { cssClass: 'e-flat', iconCss: 'e-update e-icons' } },
  {
    type: 'Cancel', buttonOption: { cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons' }
  }];
customAttributes = {class: 'actionbtn'};
public editSettings: EditSettingsModel = {
  showDeleteConfirmDialog: true,
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true,
  mode: 'Dialog'
};
  testForm: FormGroup;
  orderForm: FormGroup;
  plantList = [
    {
      id: 1,
      plantName: 'ABC'
    },
    {
      id: 2,
      plantName: 'ABC1'
    },
    {
      id: 3,
      plantName: 'ABC2'
    },
    {
      id: 4,
      plantName: 'ABC3'
    },
  ]

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.toolbarOptions =  ['Add', 'Search'];
    this.pageSettings = { pageCount: 5 };
  }

  
  createFormGroup(data1: IOrderModel): FormGroup  {
    return(this.testForm = this.formBuilder.group({
      requestForQuoteBucketNumber: [data1.requestForQuoteBucketNumber, Validators.required],
      supplierCode: [data1.supplierCode, Validators.required],
      quoteReceivedDate: [data1.quoteReceivedDate, Validators.required],
      revision: [data1.revision, Validators.required],
      plantId: [data1.plantId, Validators.required],
    }));
  }



  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === 'add') {
      this.orderForm = this.createFormGroup(args.rowData);
    }
    if (args.requestType === 'save') {
      if (this.orderForm.valid) {
            args.data = this.orderForm.value;
        } else {
            args.cancel = true;
        }
    }
    if (args.requestType === 'beginEdit') {
     
     }
}

actionComplete(args: DialogEditEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
        // Set initail Focus
        if (args.requestType === 'beginEdit') {
        } else if (args.requestType === 'add') {
        }
    }
}

public focusIn(target: HTMLElement): void {
    target.parentElement.classList.add('e-input-focus');
}

public focusOut(target: HTMLElement): void {
    target.parentElement.classList.remove('e-input-focus');
}

get OrderID(): AbstractControl  { return this.orderForm.get('OrderID'); }

get CustomerID(): AbstractControl { return this.orderForm.get('CustomerID'); }


}


export interface IOrderModel {
  requestForQuoteBucketNumber?: any;
  supplierCode?: any;
  quoteReceivedDate?: any;
  revision?: any;
  plantId?: any;
  }