import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import * as moment from "moment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ExportService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/vansales/Export/`;
  }

  getActiveRoutes(date) {
    let params = new HttpParams();
    params = params.append(
      "date",
      moment(date, "DD/MM/YYYY").format("MM/DD/YYYY")
    );
    return this.http
      .get<any[]>(this.baseUrl + "GetAllRouteDetails", { params })
      .pipe(map((response) => response));
  }

  export(exportData) {
    return this.http
      .post<any>(this.baseUrl + "ERPExport", exportData)
      .pipe(map((response) => response));
  }
}
