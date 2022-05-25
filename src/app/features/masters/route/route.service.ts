import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { routeMaster } from "./route.model";

@Injectable({
  providedIn: "root",
})
export class RouteService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/vansales/RouteMaster/`;
  }

  getAll(params) {
    return this.http
      .get<routeMaster[]>(this.baseUrl + "GetAll", { params })
      .pipe(map((response) => response));
  }

  getbyId(id: number) {
    return this.http
      .get<any[]>(this.baseUrl + "Get/" + id)
      .pipe(map((response) => response));
  }

  delete(id: number) {
    return this.http
      .delete(this.baseUrl + "Delete" + "?id=" + id)
      .pipe(map((response) => response));
  }

  add(routeData: any) {
    return this.http
      .post<any>(this.baseUrl + "Insert", routeData)
      .pipe(map((response) => response));
  }

  update(routeData: any) {
    return this.http
      .put<any>(this.baseUrl + "Update", routeData)
      .pipe(map((response) => response));
  }

  getCustomers() {
    return this.http
      .get<any>(this.baseUrl + "GetAllCustomer")
      .pipe(map((response) => response));
  }

  validateExcelData(excelData) {
    return this.http
      .post<any>(this.baseUrl + "ValidateRouteMasterExcelData", excelData)
      .pipe(map((response) => response));
  }
}
