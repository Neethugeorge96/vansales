import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { DeviceMaster } from "./device.model";

@Injectable({
  providedIn: "root",
})
export class DeviceService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/vansales/DeviceMaster/`;
  }
  getAll() {
    return this.http
      .get<DeviceMaster[]>(this.baseUrl + "GetAll")
      .pipe(map((response) => response));
  }

  add(deviceData: any) {
    return this.http
      .post<any>(this.baseUrl + "Insert", deviceData)
      .pipe(map((response) => response));
  }

  update(deviceData: any) {
    return this.http
      .put<any>(this.baseUrl + "Update", deviceData)
      .pipe(map((response) => response));
  }

  delete(id: number) {
    return this.http
      .delete(this.baseUrl + "Delete" + "?id=" + id)
      .pipe(map((response) => response));
  }
}
