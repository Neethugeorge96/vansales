import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { IntegrationSettings } from "./integration.model";

@Injectable({
  providedIn: 'root'
})
export class IntegrationSettingsService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/vansales/IntegrationSettings/`;
  }

  getAll() {
    return this.http
      .get<IntegrationSettings[]>(this.baseUrl + "GetAll")
      .pipe(map((response) => response));
  }

  add(integrationData: any) {
    return this.http
      .post<any>(this.baseUrl + "Insert", integrationData)
      .pipe(map((response) => response));
  }

  update(integrationData: any) {
    return this.http
      .put<any>(this.baseUrl + "Update", integrationData)
      .pipe(map((response) => response));
  }

  delete(id: number) {
    return this.http
      .delete(this.baseUrl + "Delete" + "?id=" + id)
      .pipe(map((response) => response));
  }
}
