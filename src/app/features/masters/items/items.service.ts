import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Items } from "./items.model";

@Injectable({
  providedIn: "root",
})
export class ItemsService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/vansales/`;
  }

  getAll() {
    return this.http
      .get<Items[]>(this.baseUrl + "ItemMaster/GetAll")
      .pipe(map((response) => response));
  }

  getbyId(data: any) {
    return this.http
      .get<any[]>(this.baseUrl + "ItemMaster/Get/" + data.id)
      .pipe(map((response) => response));
  }

  getUom() {
    return this.http
      .get<any[]>(this.baseUrl + "UOMMaster/GetAll")
      .pipe(map((response) => response));
  }

  add(itemDetails: any) {
    return this.http
      .post<any>(this.baseUrl + "ItemMaster/Insert", itemDetails)
      .pipe(map((response) => response));
  }

  update(ItemData: any) {
    return this.http
      .put<number>(this.baseUrl + "ItemMaster/Update", ItemData)
      .pipe(map((response) => response));
  }

  delete(id: number) {
    return this.http
      .delete(this.baseUrl + "ItemMaster/Delete/" + "?id=" + id)
      .pipe(map((response) => response));
  }

  importERPData(importFilters) {
    let params = new HttpParams();
    params = params.append("url", importFilters ? importFilters.url : 0);
    params = params.append(
      "version",
      importFilters ? importFilters.version : 0
    );
    params = params.append(
      "xapiKey",
      importFilters ? importFilters.xapiKey : 0
    );

    return this.http
      .get<any[]>(
        this.baseUrl + "ERPItemMasterIntegration/GetAllERPItemMasters",
        { params }
      )
      .pipe(map((response) => response));
  }

  saveERPData(erpData) {
    return this.http
      .post<any>(this.baseUrl + "ERPItemMasterIntegration/BulkInsert", erpData)
      .pipe(map((response) => response));
  }
}
