import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { IBattleSetupDto } from '../dto/battle-setup.dto';
import { IScenarioSetupDto } from '../dto/scenario-setup.dto';
import { IBattle } from '../interfaces/IBattle';
import { IHeroData } from '../interfaces/IHeroData';
import { IPosition } from '../interfaces/IPosition';
import { HttpService } from '../services/http.service';
import { Const } from '../static/const';
import { BaseDataProvider } from './base.dataprovider';

@Injectable({
  providedIn: 'root'
})
export class BattleDataProvider extends BaseDataProvider {
  constructor(private httpService: HttpService) {
    super();
  }

  getScenarios(): Observable<IScenarioSetupDto[]> {
    const headers = new HttpHeaders();
    return this.httpService.get(this.getApiUrl(Const.apiScenarios), {}, headers).do(
      (res: IScenarioSetupDto[]) => {},
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      }
    );
  }

  startBattle(battleSetup: IBattleSetupDto): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(this.getApiUrl(Const.apiStartBattle), battleSetup, headers).do(
      (res: IBattle) => {},
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      }
    );
  }

  getHeroData(heroId: string): Observable<IHeroData> {
    const headers = new HttpHeaders();
    return this.httpService.get(this.getApiUrl(Const.apiHeroData), { heroId }, headers).do(
      (res: IHeroData) => {},
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      }
    );
  }

  getMovePoints(battleId: string): Observable<IPosition[]> {
    const headers = new HttpHeaders();
    return this.httpService.get(this.getApiUrl(Const.apiMovePoints), { battleId }, headers).do(
      (res: IPosition[]) => {},
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      }
    );
  }

  moveHero(battleId: string, position: IPosition): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(this.getApiUrl(Const.apiMoveHero), { battleId, position }, headers).do(
      (res: IBattle) => {},
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      }
    );
  }

  endTurn(battleId: string): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(this.getApiUrl(Const.apiEndTurn), { battleId }, headers).do(
      (res: IBattle) => {},
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      }
    );
  }

  findEnemies(battleId: string, sourceHeroId: string, radius: number): Observable<string[]> {
    const headers = new HttpHeaders();
    return this.httpService.get(this.getApiUrl(Const.apiFindEnemies), { battleId, sourceHeroId, radius }, headers).do(
      (res: string[]) => {},
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      }
    );
  }

  findAllies(battleId: string, sourceHeroId: string, radius: number, includeSelf: boolean): Observable<string[]> {
    const headers = new HttpHeaders();
    return this.httpService.get(this.getApiUrl(Const.apiFindAllies), { battleId, sourceHeroId, radius, includeSelf }, headers).do(
      (res: string[]) => {},
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      }
    );
  }

  findHeroes(battleId: string, sourceHeroId: string, radius: number): Observable<string[]> {
    const headers = new HttpHeaders();
    return this.httpService.get(this.getApiUrl(Const.apiFindHeroes), { battleId, sourceHeroId, radius }, headers).do(
      (res: string[]) => {},
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      }
    );
  }

  useWeapon(battleId: string, targetId: string, weaponId: string): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(this.getApiUrl(Const.apiUseWeapon), { battleId, targetId, weaponId }, headers).do(
      (res: IBattle) => {},
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      }
    );
  }

  castAbility(battleId: string, abilityId: string, targetId: string, position: IPosition): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(this.getApiUrl(Const.apiCastAbility), { battleId, abilityId, targetId, position }, headers).do(
      (res: IBattle) => {},
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      }
    );
  }

  upgradeEquip(battleId: string, equipId: string): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(this.getApiUrl(Const.apiUpgradeEquip), { battleId, equipId }, headers).do(
      (res: IBattle) => {},
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      }
    );
  }
}
