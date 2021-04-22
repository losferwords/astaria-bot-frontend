import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { IBattle } from '../interfaces/IBattle';
import { HttpService } from '../services/http.service';
import { Const } from '../static/const';
import { BaseDataProvider } from './base.dataprovider';

@Injectable({
  providedIn: 'root'
})
export class BotDataProvider extends BaseDataProvider {
  constructor(private httpService: HttpService) {
    super();
  }

  botAction(battleId: string): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(this.getApiUrl(Const.apiBotAction), { battleId }, headers).do(
      (res: IBattle) => {},
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      }
    );
  }
}