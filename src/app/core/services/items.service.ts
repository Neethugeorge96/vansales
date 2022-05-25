import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  public tradingUrl = 'http://localhost:5010';
  baseUrl: string;
  public http: HttpClient;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = `${this.tradingUrl}/api/trading`;
  }

  getAllItems() {
    return this.http.get<any[]>(this.baseUrl + '/item/getAll').pipe(map(response => response));
  }
  getAllItemSegment() {
    return this.http.get<any[]>(this.baseUrl + '/ItemSegment/getAll').pipe(map(response => response));
  }
  getAllItemFamily() {
    return this.http.get<any[]>(this.baseUrl + '/ItemFamily/getAll').pipe(map(response => response));
  }
  getAllItemClass() {
    return this.http.get<any[]>(this.baseUrl + '/ItemClass/getAll').pipe(map(response => response));
  }
  getAllItemCommodity() {
    return this.http.get<any[]>(this.baseUrl + '/ItemCommodity/getAll').pipe(map(response => response));
  }
}
