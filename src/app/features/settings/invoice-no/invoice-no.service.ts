import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { InvoiceSettings } from "./invoice-no.model";

@Injectable({
  providedIn: 'root'
})
export class InvoiceNoService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/vansales/InvoiceSettings/`;
  }

  getAll() {
    return this.http
      .get<InvoiceSettings[]>(this.baseUrl + "GetAll")
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
}
