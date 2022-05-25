import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    //baseUrl = 'http://localhost:5002/api/';
    this.baseUrl = baseUrl;
  }
  getAll(url) {
    return this.http.get<any>(this.baseUrl + url);
  }

  get(url, id) {
    return this.http.get<any>(this.baseUrl + url + id);
  }

  getId(url, id1, id2) {
    return this.http.get<any>(this.baseUrl + url + id1 + '/' + id2);
  }
  getByThreeId(url, id1, id2, id3) {
    return this.http.get<any>(this.baseUrl + url + id1 + '/' + id2 + '/' + id3);
  }

  insert(url, item: any) {
    return this.http.post<any>(this.baseUrl + url, item);
  }
  update(url, item: any) {
    return this.http.put<any>(this.baseUrl + url, item);
  }

  updateById(url, id: any) {
    return this.http.put<any>(this.baseUrl + url + id, '');
  }
  updateByTwoItem(url, id, type) {
    return this.http.put<any>(this.baseUrl + url + '?purchaseReturnId=' + id + '&type=' + type, '');
  }
  deleteByID(id: number, url) {
    return this.http.delete<any>(this.baseUrl + url + id);
  }
  deleteByTwoID(id1: number, id2: any, url) {
    return this.http.delete<any>(this.baseUrl + url + id1 + '/' + id2);
  }
  deleteAsOject(data: any, url) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: data,
    };
    return this.http.delete<any>(this.baseUrl + url, httpOptions);
  }
  insertById(url, id: number) {
    return this.http.post<any>(this.baseUrl + url + "?id=" + id, '');
  }
  insertByTwoItem(url, item1: any, item2: any) {
    return this.http.post<any>(this.baseUrl + url + "?type=" + item1 + "&purchaseReturnId=" + item2, '');
  }
}
