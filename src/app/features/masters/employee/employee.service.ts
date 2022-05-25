
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { EmployeeMasterViewModel } from "./employee.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/vansales/EmployeeMaster/`; 
  }
  getAll() {
    return this.http
      .get<EmployeeMasterViewModel[]>(this.baseUrl + "GetAll")
      .pipe(map((response) => response));
  }

  getbyId(data: any) {
    return this.http
      .get<any[]>(this.baseUrl + "Get/" + data.id)
      .pipe(map((response) => response));
  }

 

  add(employeeDetails: any) {
    return this.http
      .post<any>(this.baseUrl + "Insert", employeeDetails)
      .pipe(map((response) => response));
  }

  update(employeeDetails: any) {
    return this.http
      .put<any>(this.baseUrl + "Update", employeeDetails)
      .pipe(map((response) => response));
  }

  delete(id: number) {
    return this.http
      .delete(this.baseUrl + "Delete" + "?id=" + id)
      .pipe(map((response) => response));
  }

  getAllDesignation() {
    return this.http
      .get<any[]>(this.baseUrl + "GetAllDesignationMaster")
      .pipe(map((response) => response));
  }
}
