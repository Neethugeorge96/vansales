import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class SalesHistoryService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/vansales/SalesHistory/`;
  }

  getAll(filters) {
    let params = new HttpParams();
    params = params.append(
      "fromDate",
      filters.fromDate
        ? moment(filters.fromDate, "DD/MM/YYYY").format("MM/DD/YYYY")
        : ""
    );
    params = params.append(
      "toDate",
      filters.toDate
        ? moment(filters.toDate, "DD/MM/YYYY").format("MM/DD/YYYY")
        : ""
    );
    params = params.append("routeId", filters.routeId ? filters.routeId : 0);
    params = params.append(
      "customerId",
      filters.customerId ? filters.customerId : 0
    );
    params = params.append(
      "employeeId",
      filters.employeeId ? filters.employeeId : 0
    );
    params = params.append("type", filters.type);
    return this.http
      .get<any[]>(this.baseUrl + "GetSalesHistory", { params })
      .pipe(map((response) => response));
  }
}
