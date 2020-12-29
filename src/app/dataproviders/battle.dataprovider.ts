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
export class BattleDataProvider extends BaseDataProvider {
  constructor(
    private httpService: HttpService
  ) {
    super();
  }

  getScenarioTeamSize(id: string): Observable<number[]> {
    const headers = new HttpHeaders();
    return this.httpService.get(this.getApiUrl(Const.apiScenarioTeamSize), {id}, headers).do((res: number[]) => {
    },
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      });
  }

  startBattle(id: string): Observable<any> {
    const headers = new HttpHeaders();
    return this.httpService.get(this.getApiUrl(Const.apiStartBattle), {id}, headers).do((res: IBattle) => {
      },
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      });
  }
}
