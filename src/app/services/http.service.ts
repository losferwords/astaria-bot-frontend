import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Const } from '../static/const';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(protected http: HttpClient) {}

  get(url: string, params?: any, headers?: HttpHeaders): Observable<any> {
    headers = this.prepareHeaders(headers);
    return this.http.get(url, { headers, params }).pipe(retry(1), catchError((err) => this.handleError(err)));
  }

  post(url: string, data: any, headers?: HttpHeaders): Observable<any> {
    headers = this.prepareHeaders(headers);
    this.prepareHeaders(headers);
    const requestData = data instanceof ArrayBuffer ? data : JSON.stringify(data);
    return this.http.post(url, requestData, { headers }).pipe(retry(1), catchError((err) => this.handleError(err)));
  }

  put(url: string, data: any, headers?: HttpHeaders): Observable<any> {
    headers = this.prepareHeaders(headers);
    this.prepareHeaders(headers);
    const requestData = data instanceof ArrayBuffer ? data : JSON.stringify(data);
    return this.http.put(url, requestData, { headers }).pipe(retry(1), catchError((err) => this.handleError(err)));
  }

  delete(url: string, params?: any, headers?: HttpHeaders): Observable<any> {
    headers = this.prepareHeaders(headers);
    return this.http.delete(url, { headers, params }).pipe(retry(1), catchError((err) => this.handleError(err)));
  }

  private prepareHeaders(headers: HttpHeaders): HttpHeaders {
    if (!headers.has(Const.httpHeaderContentType)) {
      headers = headers.set(Const.httpHeaderContentType, Const.httpHeaderContentTypeVal);
    }
    if (!headers.has(Const.httpHeaderAccept)) {
      headers = headers.set(Const.httpHeaderAccept, Const.httpHeaderAcceptVal);
    }
    return headers;
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    return throwError(() => new Error(error.message));
  }
}
