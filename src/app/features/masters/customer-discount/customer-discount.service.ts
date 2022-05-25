import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { CustomerDiscountViewModel } from "./customer-discount.model";

@Injectable({
  providedIn: "root",
})
export class CustomerDiscountService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/vansales/CustomerDiscount/`;
  }

  getAll() {
    return this.http
      .get<CustomerDiscountViewModel[]>(this.baseUrl + "GetAll")
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

  add(priceData: any) {
    return this.http
      .post<any>(this.baseUrl + "Insert", priceData)
      .pipe(map((response) => response));
  }

  update(priceData: any) {
    return this.http
      .put<any>(this.baseUrl + "Update", priceData)
      .pipe(map((response) => response));
  }

  getItems(customerId) {
    let params = new HttpParams();
    params = params.append("customerId", customerId ? customerId : 0);
    return this.http.get<any>(this.baseUrl + "GetAllItems", { params });
  }

  validateExcelData(excelData) {
    return this.http
      .post<any>(this.baseUrl + "ValidateCustomerDiscountExcelData", excelData)
      .pipe(map((response) => response));
  }
}
