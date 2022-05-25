import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { userMaster } from "./user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/vansales/`;
  }
  getAll() {
    return this.http
      .get<userMaster[]>(this.baseUrl + "UserMaster/GetAll")
      .pipe(map((response) => response));
  }

  getById(data: any) {
    return this.http.get(this.baseUrl + "UserMaster/Get/" + data.id);
  }

  getSupervisors() {
    return this.http.get(this.baseUrl + "UserMaster/GetAllLineManager");
  }

  getBranches() {
    return this.http
      .get<any[]>(this.baseUrl + "BranchMaster/GetAll")
      .pipe(map((response) => response));
  }

  add(customerData: any) {
    return this.http
      .post<any>(this.baseUrl + "UserMaster/Insert", customerData)
      .pipe(map((response) => response));
  }

  update(customerData: any) {
    return this.http
      .put<any>(this.baseUrl + "UserMaster/Update", customerData)
      .pipe(map((response) => response));
  }

  delete(id: number) {
    return this.http
      .delete(this.baseUrl + "UserMaster/Delete" + "?id=" + id)
      .pipe(map((response) => response));
  }
}
