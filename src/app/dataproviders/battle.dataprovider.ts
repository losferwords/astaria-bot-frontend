import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBattleSetupDto } from '../dto/battle-setup.dto';
import { MoveCharDto } from '../dto/move-char.dto';
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
    return this.httpService.get(this.getApiUrl(Const.apiScenarios), null, headers) as Observable<IScenarioSetupDto[]>;
  }

  startBattle(battleSetup: IBattleSetupDto): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(this.getApiUrl(Const.apiStartBattle), battleSetup, headers) as Observable<IBattle>;
  }

  getHeroData(heroId: string): Observable<IHeroData> {
    const headers = new HttpHeaders();
    return this.httpService.get(
      this.getApiUrl(Const.apiHeroData),
      new HttpParams().set('heroId', heroId),
      headers
    ) as Observable<IHeroData>;
  }

  getMovePoints(petId?: string): Observable<IPosition[]> {
    const headers = new HttpHeaders();
    return this.httpService.get(
      this.getApiUrl(Const.apiMovePoints),
      new HttpParams().set('petId', petId || ''),
      headers
    ) as Observable<IPosition[]>;
  }

  moveChar(position: IPosition, petId: string): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(
      this.getApiUrl(Const.apiMoveChar),
      { position, petId: petId || '' } as MoveCharDto,
      headers
    ) as Observable<IBattle>;
  }

  endTurn(): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(this.getApiUrl(Const.apiEndTurn), {}, headers) as Observable<IBattle>;
  }

  findEnemies(
    sourceCharId: string,
    radius: number,
    includeInvisible: boolean,
    abilityId: string,
    ignoreRaytrace?: boolean
  ): Observable<string[]> {
    const headers = new HttpHeaders();
    return this.httpService.get(
      this.getApiUrl(Const.apiFindEnemies),
      new HttpParams().appendAll({
        sourceCharId,
        radius,
        includeInvisible: includeInvisible || '',
        abilityId,
        ignoreRaytrace: ignoreRaytrace || ''
      }),
      headers
    ) as Observable<string[]>;
  }

  findAllies(
    sourceCharId: string,
    radius: number,
    includeInvisible: boolean,
    includeSelf: boolean,
    ignoreRaytrace?: boolean
  ): Observable<string[]> {
    const headers = new HttpHeaders();
    return this.httpService.get(
      this.getApiUrl(Const.apiFindAllies),
      new HttpParams().appendAll({
        sourceCharId,
        radius,
        includeInvisible: includeInvisible || '',
        includeSelf,
        ignoreRaytrace: ignoreRaytrace || ''
      }),
      headers
    ) as Observable<string[]>;
  }

  findHeroes(
    sourceCharId: string,
    radius: number,
    includeInvisible: boolean,
    includeSelf: boolean,
    ignoreRaytrace?: boolean
  ): Observable<string[]> {
    const headers = new HttpHeaders();
    return this.httpService.get(
      this.getApiUrl(Const.apiFindHeroes),
      new HttpParams().appendAll({
        sourceCharId,
        radius,
        includeInvisible: includeInvisible || '',
        includeSelf,
        ignoreRaytrace: ignoreRaytrace || ''
      }),
      headers
    ) as Observable<string[]>;
  }

  getMapAbilityPositions(
    abilityId: string,
    ignoreRaytrace?: boolean,
    ignoreObstacles?: boolean
  ): Observable<IPosition[]> {
    const headers = new HttpHeaders();
    return this.httpService.get(
      this.getApiUrl(Const.apiMapAbilityPositions),
      new HttpParams().appendAll({
        abilityId,
        ignoreRaytrace: ignoreRaytrace || '',
        ignoreObstacles: ignoreObstacles || ''
      }),
      headers
    ) as Observable<IPosition[]>;
  }

  useWeapon(targetId: string, weaponId: string): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(
      this.getApiUrl(Const.apiUseWeapon),
      { targetId, weaponId },
      headers
    ) as Observable<IBattle>;
  }

  castAbility(abilityId: string, targetId: string, position: IPosition): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(
      this.getApiUrl(Const.apiCastAbility),
      { abilityId, targetId, position },
      headers
    ) as Observable<IBattle>;
  }

  upgradeEquip(equipId: string): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(this.getApiUrl(Const.apiUpgradeEquip), { equipId }, headers) as Observable<IBattle>;
  }

  learnAbility(abilityId: string): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(this.getApiUrl(Const.apiLearnAbility), { abilityId }, headers) as Observable<IBattle>;
  }
}
