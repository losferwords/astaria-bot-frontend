import { Injectable } from '@angular/core';
import { Const } from '../static/const';

@Injectable({
  providedIn: 'root'
})
export class BaseDataProvider {
  protected getApiUrl(path: string): string {
    return Const.connectionUrl + path;
  }

  protected handleHttpError(error: Error): void {
    if (!error || (error && error.name === 'INTERNAL_ERROR')) {
      console.log('Error Status: INTERNAL_ERROR');
    }
  }
}
