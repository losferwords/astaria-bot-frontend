import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Scenario } from '../enums/scenario.enum';
import { IBattle } from '../interfaces/IBattle';
import { IBattleSetup } from '../interfaces/IBattleSetup';
import { IPosition } from '../interfaces/IPosition';
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

  getScenarios(): Observable<Scenario[]> {
    const headers = new HttpHeaders();
    return this.httpService.get(this.getApiUrl(Const.apiScenarios), {}, headers).do((res: Scenario[]) => {
    },
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      });
  }

  getScenarioTeamSize(id: Scenario): Observable<number[]> {
    const headers = new HttpHeaders();
    return this.httpService.get(this.getApiUrl(Const.apiScenarioTeamSize), {id}, headers).do((res: number[]) => {
    },
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      });
  }

  startBattle(battleSetup: IBattleSetup): Observable<IBattle> {
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

  moveHero(battleId: string, position: IPosition): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(this.getApiUrl(Const.apiMoveHero), {battleId, position}, headers).do((res: IBattle) => {
    },
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      });
  }

  endTurn(battleId: string): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(this.getApiUrl(Const.apiEndTurn), {battleId}, headers).do((res: IBattle) => {
    },
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      });
  }

  findEnemies(battleId: string, sourceHeroId: string, radius: number): Observable<string[]> {
    const headers = new HttpHeaders();
    return this.httpService.get(this.getApiUrl(Const.apiFindEnemies), {battleId, sourceHeroId, radius}, headers).do((res: string[]) => {
    },
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      });
  }

  useWeapon(battleId: string, targetId: string, weaponId: string): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(this.getApiUrl(Const.apiUseWeapon), {battleId, targetId, weaponId}, headers).do((res: IBattle) => {
    },
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      });
  }
}
