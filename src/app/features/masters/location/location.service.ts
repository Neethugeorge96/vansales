import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { LocationMaster } from "./location.model";

@Injectable({
  providedIn: "root",
})
export class LocationService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/vansales/`;
  }

  getCities() {
    return this.http
      .get<any[]>(this.baseUrl + "CityMaster/GetAll")
      .pipe(map((response) => response));
  }

  getAll() {
    return this.http
      .get<LocationMaster[]>(this.baseUrl + "LocationMaster/GetAll")
      .pipe(map((response) => response));
  }

  getbyId(data: any) {
    return this.http
      .get<any[]>(this.baseUrl + "LocationMaster/Get/" + data.id)
      .pipe(map((response) => response));
  }

  add(VanMasterData: any) {
    return this.http
      .post<any>(this.baseUrl + "LocationMaster/Insert", VanMasterData)
      .pipe(map((response) => response));
  }

  update(VanMasterData: any) {
    return this.http
      .put<any>(this.baseUrl + "LocationMaster/Update", VanMasterData)
      .pipe(map((response) => response));
  }

  delete(id: number) {
    return this.http
      .delete(this.baseUrl + "LocationMaster/Delete" + "?id=" + id)
      .pipe(map((response) => response));
  }
}
