import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { IBattle } from '../interfaces/IBattle';
import { IBattleSetup } from '../interfaces/IBattleSetup';
import { IPosition } from '../interfaces/IPosition';
import { ITeamSetup } from '../interfaces/ITeamSetup';
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

  startBattle(battleSetup: IBattleSetup): Observable<any> {
    const headers = new HttpHeaders();
    return this.httpService.post(this.getApiUrl(Const.apiStartBattle), battleSetup, headers).do((res: IBattle) => {
    },
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      });
  }

  getMovePoints(battleId: string): Observable<IPosition[]> {
    const headers = new HttpHeaders();
    return this.httpService.get(this.getApiUrl(Const.apiMovePoints), {battleId}, headers).do((res: IPosition[]) => {
    },
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      });
  }
}
