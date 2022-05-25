import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  baseUrl: string;
  public http: HttpClient;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}Currency`;
  }

  getAll() {
    return this.http.get<any[]>(this.baseUrl + '/GetAll/Lite').pipe(map(response => response));
  }
}
