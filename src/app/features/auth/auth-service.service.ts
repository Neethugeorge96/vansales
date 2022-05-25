import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { AnyFn } from "@ngrx/store/src/selector";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/vansales/Login/`;

    }



    get(loginData) {
      loginData.BranchId=['1'];
      loginData.ConfirmPassword=loginData.password;
      return this.http
        .post<any[]>(this.baseUrl + "GetLoginDetails" ,loginData)
        .pipe(map((response) => response));
    }

}
