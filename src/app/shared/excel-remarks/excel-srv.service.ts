import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ExcelSrvService {
  public data: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public gridFields: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentDetails: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public excelValidated: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor() {}

  updateData(data) {
    this.data.next(data);
  }

  updateGridfields(data) {
    this.gridFields.next(data);
  }

  updateCurrentRecord(data) {
    this.currentDetails.next(data);
  }

  updateExcelValidity(data) {
    this.excelValidated.next(data);
  }
}
