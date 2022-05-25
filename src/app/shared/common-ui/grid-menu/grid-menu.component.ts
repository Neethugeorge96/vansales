import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-menu',
  templateUrl: './grid-menu.component.html',
})
export class GridMenuComponent implements OnInit {
  supplierLineData=[
  { 
  "itemId": 105,
  "itemCode": "08-01-01-18-004",
  "itemName": "item 1111",
  "supplierQuoteQuantity": 0,
  "purchaseUomCode": 53,
   "purchaseRequestLineId":1,
   "purchaseCurrencyCode":"AS12"
  },
  { 
    "itemId": 106,
    "itemCode": "06-01-01-18-004",
    "itemName": "item 61",
    "supplierQuoteQuantity": 6,
    "purchaseUomCode": 56,
    "purchaseRequestLineId":6,
    "purchaseCurrencyCode":"AS16"
    },
];
rowAction=['Update Supplier Quotes','Alternate Items'];
  constructor() { }

  ngOnInit(): void {
  }

}
