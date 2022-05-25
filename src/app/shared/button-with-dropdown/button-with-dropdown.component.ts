import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CONSOLE_API } from 'src/app/app.enum';
import { ApiService } from 'src/app/core/services/api.service';
@Component({
  selector: 'app-button-with-dropdown',
  templateUrl: './button-with-dropdown.component.html',
  styleUrls: ['./button-with-dropdown.component.scss']
})
export class ButtonWithDropdownComponent implements OnInit {
  console: any;
  currencyList: any;
  @Output() gpData = new EventEmitter<any>();
  @Input() dataFromParent=null;
  dataForParent={dataDrop:'',text:''};
  constructor(private apiService:ApiService,) {
    console.log('data',this.dataFromParent)
   }

  ngOnInit(): void {
    this.console=CONSOLE_API;
  }
  getAllCurrency(){
    this.apiService.getAll(this.console.CURRENCY_GET).subscribe(res=>{
      this.currencyList=res;
      console.log('currencyList',this.currencyList)
    })
  }
  dataChange(event){
   this.dataForParent.dataDrop= event.itemData;
   this.gpData.emit(this.dataForParent);
  }
}
