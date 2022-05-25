import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
} from "@angular/core";
import { SyncfusionHelperService } from "../services/syncfusion-helper.service";

@Component({
  selector: "app-validate-excel",
  templateUrl: "./validate-excel.component.html",
})
export class ValidateExcelComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() gridFields: any;
  @Output() closeEvent = new EventEmitter<string>();

  saveBtnDisabled: boolean = false;
  constructor(public syncfusionHelperService: SyncfusionHelperService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.data.length) {
      this.checkRemarks();
    }
  }

  checkRemarks() {
    let checkVal = false;
    for (let i in this.data) {
      if (this.data[i].systemRemarks != "Verified Successfully") {
        checkVal = true;
        break;
      }
    }
    if (checkVal == true) {
      this.saveBtnDisabled = true;
    }
  }

  closeDialog(event) {
    this.closeEvent.emit(event);
  }
}
