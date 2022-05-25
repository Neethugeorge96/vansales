import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.scss']
})
export class BasicTableComponent implements OnInit, OnChanges {
  constructor() {}
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  @Input() showActionButton = false;
  @Output() viewClicked = new EventEmitter<any>();
  @Input() searchParameter;
  @Input() column = [];
  @Input() row = [];
  @Input() actionSet = [];
  ngOnInit() {
    this.collectionSize = this.row && this.row.length;
  }

  openAction(value,action) {
    let data={value:value,action:action}
    this.viewClicked.emit(data);
  }

  ngOnChanges(changes: SimpleChanges) {}
}
