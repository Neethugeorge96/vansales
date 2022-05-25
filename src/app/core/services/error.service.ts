import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  getClientErrorMessage(error: Error): string {
    return error.message ?
      error.message :
      error.toString();
  }

  getServerErrorMessage(response: HttpErrorResponse): string {
    return navigator.onLine ?
    response.error ? response.error.message : response.message :
      'No Internet Connection';
  }
}