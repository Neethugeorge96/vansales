import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-common-header-area',
  templateUrl: './common-header-area.component.html',
  styleUrls: ['./common-header-area.component.scss']
})
export class CommonHeaderAreaComponent implements OnInit {
  @Output() searchValue = new EventEmitter<any>();
  constructor() { }
  searchParameter='';
  @Input() routerLink='';
  @Input() placeHolderText='';
  @Input() buttonLabel='';
  ngOnInit(): void {
  }
  onSearchChange(searchValue: string) {  
    this.searchValue.emit(searchValue);
  }
}
