import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import * as moment from "moment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class NetBillService {
  public baseUrl: string;
  public http: HttpClient;
  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/vansales/`;
  }

  getAllNetbills(filters) {
    let params = new HttpParams();
    params = params.append(
      "fromDate",
      moment(filters.fromDate, "DD/MM/YYYY").format("MM/DD/YYYY")
    );
    params = params.append(
      "toDate",
      moment(filters.toDate, "DD/MM/YYYY").format("MM/DD/YYYY")
    );
    if (filters.paymentStatus) {
      params = params.append("paymentStatus", filters.paymentStatus);
    }
    params = params.append(
      "customerId",
      filters.customerId ? filters.customerId : 0
    );
    return this.http
      .get<any[]>(this.baseUrl + "NetBills/GetAllNetBills", { params })
      .pipe(map((response) => response));
  }
}
