import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Predicate, Query } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-dropdown-with-table',
  templateUrl: './dropdown-with-table.component.html',
  styleUrls: ['./dropdown-with-table.component.scss']
})
export class DropdownWithTableComponent implements OnInit {
  dropdownForm: FormGroup;
  // textvalue: any ='';
  @Input() data = null;
  // @Input() id = null;
  source:any;
  code:any;
  @Output() respons = new EventEmitter<any>();
  fields={ text: 'itemFamilyName', value: 'itemFamilyCode' };
  constructor(private fb: FormBuilder,) {
    console.log('data',this.data);
    this.dropdownForm = this.createFormGroup();
   }

  ngOnInit(): void {
    
  }
  createFormGroup() {
    return (this.dropdownForm = this.fb.group({
      id: [""],
    }));
  }
  public onFilteringDropdown(e, first, second, arrayData) {    
    let predicate = new Predicate(first, 'startswith', e.text, true); 
      predicate = predicate.or(second, 'startswith', e.text,true);
      let query: Query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text !== '' ) ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(arrayData, query);
  }
  
  returnValue(data1,value){
    if(value=='Code'){
      return data1[this.fields.value]
    }else{
      return data1[this.fields.text]
    }
  }
  valueChange(event){
  // console.log(this.textvalue);
   this.respons.emit(event.itemData)
   
  }
  ngOnChanges(changes: any) {
    // this.source=changes.data.currentValue.data;
    // if(changes.data.currentValue.id){
    //   let body = {id:"43010100000"} 
    //   this.dropdownForm.patchValue(body)
    // }
    this.source = changes.data.currentValue.data;
    if ((changes.data.currentValue.id).length>0){
    //  this.code = ;
      // let body = { id:  "43010000000"}
      this.dropdownForm.setValue({id:changes.data.currentValue.id})
    }
   }
}
