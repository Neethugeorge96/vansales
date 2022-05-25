import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import * as moment from "moment";
import { map } from "rxjs/operators";
import { ForecastEntryHeaderViewModel } from "./forcast-entry.model";

@Injectable({
  providedIn: "root",
})
export class ForecastEntryService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/vansales/ForecastEntry/`;
  }

  getAll(params) {
    return this.http
      .get<any[]>(this.baseUrl + "GetAll", { params })
      .pipe(map((response) => response));
  }

  getbyId(id: number) {
    return this.http
      .get<any[]>(this.baseUrl + "Get/" + id)
      .pipe(map((response) => response));
  }

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

  add(forecastData: any) {
    forecastData.entryDate = moment(forecastData.entryDate).format(
      "YYYY-MM-DD"
    );
    forecastData.forecastDate = moment(forecastData.forecastDate).format(
      "YYYY-MM-DD"
    );
    return this.http
      .post<any>(this.baseUrl + "Insert", forecastData)
      .pipe(map((response) => response));
  }

  update(forecastData: any) {
    return this.http
      .put<any>(this.baseUrl + "Update", forecastData)
      .pipe(map((response) => response));
  }
  getAllEmployees() {
    return this.http
      .get<any>(this.baseUrl + "GetAllEmployeeMaster")
      .pipe(map((response) => response));
  }
}
