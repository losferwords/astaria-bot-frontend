import { Injectable } from '@angular/core';
import { BattleDataProvider } from '../dataproviders/battle.dataprovider';
import { Observable } from 'rxjs';
import { IBattle } from '../interfaces/IBattle';
import { IBattleSetup } from '../interfaces/IBattleSetup';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  constructor(private battleDataProvider: BattleDataProvider) {}

  getScenarioTeamSize(id: string): Observable<number[]> {
    return this.battleDataProvider.getScenarioTeamSize(id);
  }

  startBattle(battleSetup: IBattleSetup): Observable<IBattle> {
    return this.battleDataProvider.startBattle(battleSetup);
  }
}
