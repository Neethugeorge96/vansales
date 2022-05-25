import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
 import { ItemMappingMasterViewModel } from "./item-mapping.model";

@Injectable({
  providedIn: 'root'
})
export class ItemMappingService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/vansales/ItemMapping/`;

  }
  getAll() {
    return this.http
      .get<ItemMappingMasterViewModel[]>(this.baseUrl + "GetAll")
      .pipe(map((response) => response));
  }
  getbyId(iteMappedData: any) {
    return this.http
      .get<any[]>(this.baseUrl + "Get/" + iteMappedData.id)
      .pipe(map((response) => response));
  }

  add(iteMappedData: any) {
    return this.http
      .post<any>(this.baseUrl + "Insert", iteMappedData)
      .pipe(map((response) => response));
  }

  update(iteMappedData: any) {
    return this.http
      .put<any>(this.baseUrl + "Update", iteMappedData)
      .pipe(map((response) => response));
  }

  delete(id: number) {
    return this.http
      .delete(this.baseUrl + "Delete" + "?id=" + id)
      .pipe(map((response) => response));
  }
}
