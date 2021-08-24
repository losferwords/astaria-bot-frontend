import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
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
    return this.httpService.get(this.getApiUrl(Const.apiScenarios), {}, headers);
  }

  startBattle(battleSetup: IBattleSetupDto): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(this.getApiUrl(Const.apiStartBattle), battleSetup, headers);
  }

  getHeroData(heroId: string): Observable<IHeroData> {
    const headers = new HttpHeaders();
    return this.httpService.get(this.getApiUrl(Const.apiHeroData), { heroId }, headers);
  }

  getMovePoints(battleId: string, petId?: string): Observable<IPosition[]> {
    const headers = new HttpHeaders();
    return this.httpService.get(this.getApiUrl(Const.apiMovePoints), { battleId, petId: petId || '' }, headers);
  }

  moveChar(battleId: string, position: IPosition, petId: string): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(
      this.getApiUrl(Const.apiMoveChar),
      { battleId, position, petId: petId || '' },
      headers
    );
  }

  endTurn(battleId: string): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(this.getApiUrl(Const.apiEndTurn), { battleId }, headers);
  }

  findEnemies(
    battleId: string,
    sourceCharId: string,
    radius: number,
    includeInvisible: boolean,
    abilityId: string,
    ignoreRaytrace?: boolean
  ): Observable<string[]> {
    const headers = new HttpHeaders();
    return this.httpService.get(
      this.getApiUrl(Const.apiFindEnemies),
      {
        battleId,
        sourceCharId,
        radius,
        includeInvisible: includeInvisible || '',
        abilityId,
        ignoreRaytrace: ignoreRaytrace || ''
      },
      headers
    );
  }

  findAllies(
    battleId: string,
    sourceCharId: string,
    radius: number,
    includeInvisible: boolean,
    includeSelf: boolean,
    ignoreRaytrace?: boolean
  ): Observable<string[]> {
    const headers = new HttpHeaders();
    return this.httpService.get(
      this.getApiUrl(Const.apiFindAllies),
      {
        battleId,
        sourceCharId,
        radius,
        includeInvisible: includeInvisible || '',
        includeSelf,
        ignoreRaytrace: ignoreRaytrace || ''
      },
      headers
    );
  }

  findHeroes(
    battleId: string,
    sourceCharId: string,
    radius: number,
    includeInvisible: boolean,
    includeSelf: boolean,
    ignoreRaytrace?: boolean
  ): Observable<string[]> {
    const headers = new HttpHeaders();
    return this.httpService.get(
      this.getApiUrl(Const.apiFindHeroes),
      {
        battleId,
        sourceCharId,
        radius,
        includeInvisible: includeInvisible || '',
        includeSelf,
        ignoreRaytrace: ignoreRaytrace || ''
      },
      headers
    );
  }

  getMapAbilityPositions(
    battleId: string,
    abilityId: string,
    ignoreRaytrace?: boolean,
    ignoreObstacles?: boolean
  ): Observable<IPosition[]> {
    const headers = new HttpHeaders();
    return this.httpService.get(
      this.getApiUrl(Const.apiMapAbilityPositions),
      { battleId, abilityId, ignoreRaytrace: ignoreRaytrace || '', ignoreObstacles: ignoreObstacles || '' },
      headers
    );
  }

  useWeapon(battleId: string, targetId: string, weaponId: string): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(this.getApiUrl(Const.apiUseWeapon), { battleId, targetId, weaponId }, headers);
  }

  castAbility(battleId: string, abilityId: string, targetId: string, position: IPosition): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(
      this.getApiUrl(Const.apiCastAbility),
      { battleId, abilityId, targetId, position },
      headers
    );
  }

  upgradeEquip(battleId: string, equipId: string): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(this.getApiUrl(Const.apiUpgradeEquip), { battleId, equipId }, headers);
  }

  learnAbility(battleId: string, abilityId: string): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(this.getApiUrl(Const.apiLearnAbility), { battleId, abilityId }, headers);
  }
}
