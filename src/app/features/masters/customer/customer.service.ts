import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Customer } from "./customer.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  public http: HttpClient;
  public baseUrl: string;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/vansales/`;
  }

  getAll(params) {
    return this.http
      .get<Customer[]>(this.baseUrl + "CustomerMaster/GetAll", { params })
      .pipe(map((response) => response));
  }

  getById(data: any) {
    return this.http.get(this.baseUrl + "CustomerMaster/Get/" + data.id);
  }

  getCities() {
    return this.http
      .get<any[]>(this.baseUrl + "CityMaster/GetAll")
      .pipe(map((response) => response));
  }

  getLocationsbycity(id) {
    return this.http.get<any[]>(
      this.baseUrl + "CityMaster/GetAllLocationUnderCity/" + id
    );
  }

  getCurrencies() {
    return this.http
      .get<any[]>(this.baseUrl + "CurrencyMaster/GetAll")
      .pipe(map((response) => response));
  }

  add(customerData: any) {
    return this.http
      .post<any>(this.baseUrl + "CustomerMaster/Insert", customerData)
      .pipe(map((response) => response));
  }

  update(customerData: any) {
    return this.http
      .put<any>(this.baseUrl + "CustomerMaster/Update", customerData)
      .pipe(map((response) => response));
  }

  delete(id: number) {
    return this.http
      .delete(this.baseUrl + "CustomerMaster/Delete" + "?id=" + id)
      .pipe(map((response) => response));
  }
}
