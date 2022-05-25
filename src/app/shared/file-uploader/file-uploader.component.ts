import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from "@angular/core";
import { DialogComponent } from "@syncfusion/ej2-angular-popups";
import { EmitType } from "@syncfusion/ej2-base";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import * as XLSX from "xlsx";
import * as _ from "lodash";

@Component({
  selector: "app-file-uploader",
  templateUrl: "./file-uploader.component.html",
})
export class FileUploaderComponent implements OnInit, OnChanges {
  @Input() showDialog: boolean;
  @Input() uniqKey: string;
  @Output() closeEvent = new EventEmitter<boolean>();
  @Output() uploadEvent = new EventEmitter<any>();
  @ViewChild("ejDialog") ejDialog: DialogComponent;
  public targetElement: HTMLElement;
  public position: object = { X: "right", Y: "top" };
  file: any;
  fileData: any;
  hasDuplicate: boolean = false;
  constructor(public toastr: ToasterServiceService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.showDialog) this.onOpenDialog();
  }

  public onOpenDialog = function (): void {
    // this.showDialog = true;
    this.ejDialog.show();
  };

  public onOverlayClick: EmitType<object> = () => {
    this.showDialog = false;
    this.ejDialog.hide();
    this.closeDialog();
  };

  closeDialog() {
    this.file = null;
    this.fileData = null;
    this.showDialog = false;
    this.closeEvent.emit(this.showDialog);
  }

  uploadFile() {
    this.uploadEvent.emit(this.fileData);
    this.closeDialog();
    this.ejDialog.hide();
  }

  public validation(event: any): void {
    if (this.showDialog) {
      event.cancel = false;
    } else {
      event.cancel = true;
    }
  }

  onFileSelected(event) {
    this.file = event.target.files[0];

    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(event.target.files[0]);
    fileReader.onload = (e) => {
      let arrayBuffer: any = fileReader.result;
      var data = new Uint8Array(arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {
        type: "binary",
        cellDates: true,
        dateNF: "dd/mm/yyyy",
      });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.fileData = XLSX.utils.sheet_to_json(worksheet, { raw: false });

      let Result = _.uniqBy(this.fileData, this.uniqKey);
      let duplicateValues = _.difference(this.fileData, Result);
      let duplicateKeynames = [];
      duplicateValues.map((item) => {
        duplicateKeynames.push(item[this.uniqKey]);
      });
      if (Result.length != this.fileData.length) {
        this.hasDuplicate = true;
        this.toastr.showWarningMessage(
          "File Contains Duplicate Entries with " +
            this.uniqKey +
            "  " +
            duplicateKeynames.toString()
        );
      } else this.hasDuplicate = false;
    };
  }
}
