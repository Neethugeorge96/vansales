import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-popup',
  templateUrl: './view-popup.component.html',
  styleUrls: ['./view-popup.component.scss']
})
export class ViewPopupComponent implements OnInit {
  viewData: any;
  data=[];
  isSingleLayer: boolean = false;
  isTwoLayer: boolean = false;
  isThreeLayer: boolean = false;
  layer: number;
  isWarehouseView: boolean = false;
  isWarehouse: any;
  rackBinList = [];
  rackBin: any;
  constructor(
    public activeModal: NgbActiveModal,
    //private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.data.push(this.viewData);
    if(this.layer === 1) {
      this.isSingleLayer =  true;
      this.isTwoLayer = false;
      this.isThreeLayer = false;
    } else if(this.layer === 2) {
      this.isSingleLayer =  false;
      this.isTwoLayer = true;
      this.isThreeLayer = false;
    } else if(this.layer === 3) {
      this.isSingleLayer =  false;
      this.isTwoLayer = false;
      this.isThreeLayer = true;
    }
    if(this.isWarehouse) {
      this.isWarehouseView = this.isWarehouse;
      this.rackBinList = this.rackBin;
    }
  }

}
