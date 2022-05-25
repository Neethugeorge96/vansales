import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import * as moment from "moment";
import { map } from "rxjs/operators";
import { PriceListMasterViewModel } from "./price.model";

@Injectable({
  providedIn: "root",
})
export class PriceService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/vansales/PriceListMaster/`;
  }

  getAll() {
    return this.http
      .get<PriceListMasterViewModel[]>(this.baseUrl + "GetAll")
      .pipe(map((response) => response));
  }

  getbyId(id: number) {
    return this.http
      .get<any[]>(this.baseUrl + "Get/" + id)
      .pipe(map((response) => response));
  }

  // delete(id: number) {
  //   return this.http
  //     .delete(this.baseUrl + "Delete" + "?id=" + id)
  //     .pipe(map((response) => response));
  // }
  delete(id: number) {
    return this.http
      .delete(this.baseUrl + "Delete?id=" + id)
      .pipe(map((response) => response));
  }
  deleteByItem(id: number) {
    return this.http
      .delete(this.baseUrl + "Delete" + id)
      .pipe(map((response) => response));
  }

  add(priceData: any) {
    priceData.effectiveFrom = moment(priceData.effectiveFrom).format(
      "YYYY/MM/DD"
    );
    priceData.effectiveTo = moment(priceData.effectiveTo).format("YYYY/MM/DD");
    return this.http
      .post<any>(this.baseUrl + "Insert", priceData)
      .pipe(map((response) => response));
  }

  update(priceData: any) {
    priceData.effectiveFrom = moment(priceData.effectiveFrom).format(
      "YYYY/MM/DD"
    );
    priceData.effectiveTo = moment(priceData.effectiveTo).format("YYYY/MM/DD");
    return this.http
      .put<any>(this.baseUrl + "Update", priceData)
      .pipe(map((response) => response));
  }

  validateExcel(data: any) {
    return this.http
      .post<any>(this.baseUrl + "ValidatePriceListExcelData", data)
      .pipe(map((response) => response));
  }

  bulkUpdate(priceData: any) {
    return this.http
      .put<any>(this.baseUrl + "BulkUpdate", priceData)
      .pipe(map((response) => response));
  }
}
