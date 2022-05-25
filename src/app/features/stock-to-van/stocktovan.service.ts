import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { stocktovanModel } from "./stocktovan.model";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class StocktovanService {
  public baseUrl: string;
  public http: HttpClient;
  excelRemarks: any;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/vansales/StockToVan/`;
  }

  getAll(filters) {
    let params = new HttpParams();
    params = params.append(
      "fromdate",
      moment(filters.fromdate, "DD/MM/YYYY").format("MM/DD/YYYY")
    );
    params = params.append(
      "toDate",
      moment(filters.toDate, "DD/MM/YYYY").format("MM/DD/YYYY")
    );
    params = params.append("routeId", filters.routeId ? filters.routeId : 0);
    params = params.append("vanId", filters.vanId ? filters.vanId : 0);
    return this.http
      .get<stocktovanModel[]>(this.baseUrl + "GetAll", { params })
      .pipe(map((response) => response));
  }

  getbyId(id) {
    return this.http
      .get<any>(this.baseUrl + "Get/" + id)
      .pipe(map((response) => response));
  }

  add(stocktovanData: any) {
    return this.http
      .post<any>(this.baseUrl + "Insert", stocktovanData)
      .pipe(map((response) => response));
  }

  delete(id: number) {
    return this.http
      .delete(this.baseUrl + "Delete" + "?id=" + id)
      .pipe(map((response) => response));
  }

  StockToVanDetailsDelete(id: number) {
    return this.http
      .delete(this.baseUrl + "StockToVanDetailsDelete" + "?id=" + id)
      .pipe(map((response) => response));
  }
  validateExcel(excelValidate: any) {
    return this.http
      .post<any>(this.baseUrl + "ValidateStockToVanExcelData", excelValidate)
      .pipe(map((response) => response));
  }

  getRemarks() {
    return this.excelRemarks;
  }

  setRemarks(data) {
    this.excelRemarks = data;
  }

  getAllSalesMan(id) {
    let params = new HttpParams();
    params = params.append("employeeId", id ? id : 0);
    return this.http
      .get<any[]>(this.baseUrl + "GetAllSalesMan", { params })
      .pipe(map((response) => response));
  }

  getStockHistory(filters) {
    let params = new HttpParams();
    params = params.append(
      "fromDate",
      moment(filters.fromDate, "DD/MM/YYYY").format("MM/DD/YYYY")
    );
    params = params.append(
      "toDate",
      moment(filters.toDate, "DD/MM/YYYY").format("MM/DD/YYYY")
    );
    params = params.append("salesmanId", filters.salesManId);
    return this.http
      .get<any[]>(this.baseUrl + "GetAllStockInHistory", { params })
      .pipe(map((response) => response));
  }

  getStockHistoryDetails(headerId) {
    let params = new HttpParams();
    params = params.append("stockInHeaderId", headerId);
    return this.http
      .get<any[]>(this.baseUrl + "GetAllStockInDetailsHistory", { params })
      .pipe(map((response) => response));
  }
}
