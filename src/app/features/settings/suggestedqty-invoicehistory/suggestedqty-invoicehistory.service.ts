import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class SuggestedqtyInvoicehistoryService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/vansales/Settings/`;
  }

  getAll() {
    return this.http
      .get<any>(this.baseUrl + "GetAll")
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
}
