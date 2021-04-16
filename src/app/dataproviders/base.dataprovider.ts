import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { ErrorCode } from '../enums/error-code.enum';
import { Const } from '../static/const';

@Injectable({
  providedIn: 'root'
})
export class BaseDataProvider {
  constructor() {}

  protected getApiUrl(path: string): string {
    return Const.connectionUrl + path;
  }

  protected handleHttpError(error: any): void {
    const errResponse: Error = error;
    if (!errResponse || (errResponse && errResponse.name === ErrorCode.INTERNAL_ERROR)) {
      console.log('Error Status: ' + ErrorCode.INTERNAL_ERROR);
    }
  }

  protected validateRequest(hasData: boolean, requestData?: any): Observable<any> {
    let message: string;
    if (hasData && !requestData) {
      message = 'Request object is missing';
    }
    return message ? throwError(message) : null;
  }
}
