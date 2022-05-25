import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { map } from "rxjs/operators";
import { ItemGroupings } from "./item-groupping.model";

@Injectable({
  providedIn: "root",
})
export class ItemGrouppingService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/vansales/ItemGrouping/`;
  }

  getAll() {
    return this.http
      .get<ItemGroupings[]>(this.baseUrl + "GetAll")
      .pipe(map((response) => response));
  }

  getbyId(data: any) {
    return this.http
      .get<any[]>(this.baseUrl + "Get/" + data.id)
      .pipe(map((response) => response));
  }

  add(itemDetails: any) {
    return this.http
      .post<any>(this.baseUrl + "Insert", itemDetails)
      .pipe(map((response) => response));
  }

  update(ItemData: any) {
    return this.http
      .put<number>(this.baseUrl + "Update", ItemData)
      .pipe(map((response) => response));
  }

  delete(id: number) {
    return this.http
      .delete(this.baseUrl + "Delete/" + "?id=" + id)
      .pipe(map((response) => response));
  }
}
