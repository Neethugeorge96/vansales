import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { assignmentMaster } from "./assignment.model";

@Injectable({
  providedIn: "root",
})
export class AssignmentService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/vansales/Assignment/`;
  }

  getCities() {
    return this.http
      .get<any[]>(this.baseUrl + "GetAll")
      .pipe(map((response) => response));
  }

  getAll() {
    return this.http
      .get<assignmentMaster[]>(this.baseUrl + "GetAll")
      .pipe(map((response) => response));
  }

  getRoutes() {
    return this.http
      .get<any[]>(this.baseUrl + "GetAllRouteMaster")
      .pipe(map((response) => response));
  }

  getVan() {
    return this.http
      .get<any[]>(this.baseUrl + "GetAllVanMaster")
      .pipe(map((response) => response));
  }

  getEmployees() {
    return this.http
      .get<any[]>(this.baseUrl + "GetAllEmployeeMaster")
      .pipe(map((response) => response));
  }

  getbyId(data: any) {
    return this.http
      .get<any[]>(this.baseUrl + "Get/" + data.id)
      .pipe(map((response) => response));
  }

  add(VanMasterData: any) {
    return this.http
      .post<any>(this.baseUrl + "Insert", VanMasterData)
      .pipe(map((response) => response));
  }

  update(VanMasterData: any) {
    return this.http
      .put<any>(this.baseUrl + "Update", VanMasterData)
      .pipe(map((response) => response));
  }

  delete(id: number) {
    return this.http
      .delete(this.baseUrl + "Delete" + "?id=" + id)
      .pipe(map((response) => response));
  }
}
