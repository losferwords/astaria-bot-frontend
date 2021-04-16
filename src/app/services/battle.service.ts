import { Injectable } from '@angular/core';
import { BattleDataProvider } from '../dataproviders/battle.dataprovider';
import { Observable } from 'rxjs';
import { IBattle } from '../interfaces/IBattle';
import { IPosition } from '../interfaces/IPosition';
import { IScenarioSetupDto } from '../dto/scenario-setup.dto';
import { IBattleSetupDto } from '../dto/battle-setup.dto';

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  constructor(private battleDataProvider: BattleDataProvider) {}

  updateBattleState(oldState: IBattle, newState: IBattle) {
    oldState.queue = newState.queue;
    oldState.scenario = newState.scenario;
    oldState.log = newState.log;
    for (let i = 0; i < oldState.teams.length; i++) {
      oldState.teams[i].crystals = newState.teams[i].crystals;
      for (let j = 0; j < oldState.teams[i].heroes.length; j++) {
        for (const key in oldState.teams[i].heroes[j]) {
          if (oldState.teams[i].heroes[j].hasOwnProperty(key)) {
            oldState.teams[i].heroes[j][key] = newState.teams[i].heroes[j][key];
          }
        }
      }
    }
  }

  getScenarios(): Observable<IScenarioSetupDto[]> {
    return this.battleDataProvider.getScenarios();
  }

  startBattle(battleSetup: IBattleSetupDto): Observable<IBattle> {
    return this.battleDataProvider.startBattle(battleSetup);
  }

  getMovePoints(battleId: string): Observable<IPosition[]> {
    return this.battleDataProvider.getMovePoints(battleId);
  }

  moveHero(battleId: string, position: IPosition): Observable<IBattle> {
    return this.battleDataProvider.moveHero(battleId, position);
  }

  endTurn(battleId: string): Observable<IBattle> {
    return this.battleDataProvider.endTurn(battleId);
  }

  findEnemies(battleId: string, sourceHeroId: string, radius: number): Observable<string[]> {
    return this.battleDataProvider.findEnemies(battleId, sourceHeroId, radius);
  }

  useWeapon(battleId: string, targetId: string, weaponId: string): Observable<IBattle> {
    return this.battleDataProvider.useWeapon(battleId, targetId, weaponId);
  }
}
