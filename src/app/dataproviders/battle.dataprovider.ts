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

  getMovePoints(battleId: string, petId?: string): Observable<IPosition[]> {
    const headers = new HttpHeaders();
    return this.httpService.get(this.getApiUrl(Const.apiMovePoints), { battleId, petId: petId || '' }, headers).do(
      (res: IPosition[]) => {},
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      }
    );
  }

  moveChar(battleId: string, position: IPosition, petId: string): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService
      .post(this.getApiUrl(Const.apiMoveChar), { battleId, position, petId: petId || '' }, headers)
      .do(
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

  findEnemies(
    battleId: string,
    sourceCharId: string,
    radius: number,
    ignoreRaytrace?: boolean
  ): Observable<string[]> {
    const headers = new HttpHeaders();
    return this.httpService
      .get(
        this.getApiUrl(Const.apiFindEnemies),
        { battleId, sourceCharId, radius, ignoreRaytrace: ignoreRaytrace || '' },
        headers
      )
      .do(
        (res: string[]) => {},
        (err) => {
          this.handleHttpError(err);
          throwError(err);
        }
      );
  }

  findAllies(
    battleId: string,
    sourceCharId: string,
    radius: number,
    includeSelf: boolean,
    ignoreRaytrace?: boolean
  ): Observable<string[]> {
    const headers = new HttpHeaders();
    return this.httpService
      .get(
        this.getApiUrl(Const.apiFindAllies),
        { battleId, sourceCharId, radius, includeSelf, ignoreRaytrace: ignoreRaytrace || '' },
        headers
      )
      .do(
        (res: string[]) => {},
        (err) => {
          this.handleHttpError(err);
          throwError(err);
        }
      );
  }

  findHeroes(battleId: string, sourceCharId: string, radius: number, ignoreRaytrace?: boolean): Observable<string[]> {
    const headers = new HttpHeaders();
    return this.httpService
      .get(
        this.getApiUrl(Const.apiFindHeroes),
        { battleId, sourceCharId, radius, ignoreRaytrace: ignoreRaytrace || '' },
        headers
      )
      .do(
        (res: string[]) => {},
        (err) => {
          this.handleHttpError(err);
          throwError(err);
        }
      );
  }

  getMapAbilityPositions(
    battleId: string,
    abilityId: string,
    ignoreRaytrace?: boolean,
    ignoreObstacles?: boolean
  ): Observable<IPosition[]> {
    const headers = new HttpHeaders();
    return this.httpService
      .get(
        this.getApiUrl(Const.apiMapAbilityPositions),
        { battleId, abilityId, ignoreRaytrace: ignoreRaytrace || '', ignoreObstacles: ignoreObstacles || '' },
        headers
      )
      .do(
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
    return this.httpService
      .post(this.getApiUrl(Const.apiCastAbility), { battleId, abilityId, targetId, position }, headers)
      .do(
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

  learnAbility(battleId: string, abilityId: string): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(this.getApiUrl(Const.apiLearnAbility), { battleId, abilityId }, headers).do(
      (res: IBattle) => {},
      (err) => {
        this.handleHttpError(err);
        throwError(err);
      }
    );
  }
}
