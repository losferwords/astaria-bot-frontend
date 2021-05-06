import { Injectable } from '@angular/core';
import { BattleDataProvider } from '../dataproviders/battle.dataprovider';
import { Observable } from 'rxjs';
import { IBattle } from '../interfaces/IBattle';
import { IPosition } from '../interfaces/IPosition';
import { IScenarioSetupDto } from '../dto/scenario-setup.dto';
import { IBattleSetupDto } from '../dto/battle-setup.dto';
import { IHeroData } from '../interfaces/IHeroData';
import { IEquip } from '../interfaces/IEquip';
import { I18nService } from './i18n.service';

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  constructor(private battleDataProvider: BattleDataProvider, private i18nService: I18nService) {}

  updateBattleState(oldState: IBattle, newState: IBattle) {
    oldState.queue = newState.queue;
    oldState.scenario = newState.scenario;
    oldState.crystalPositions = newState.crystalPositions;
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

  getHeroData(heroId: string): Observable<IHeroData> {
    return this.battleDataProvider.getHeroData(heroId);
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

  getEquipTooltip(equip: IEquip, heroId: string): string {
    let resultTooltip = `
      <div class="block">
        <div class="block-element">${this.i18nService.translateInstant('EQUIP.' + heroId + '.' + equip.id)}</div>
        <div class="block-element">
          <img src="./assets/icons/upgrade.png">
          <div class="value">${equip.level}</div>
        </div>
      </div>
    `;

    if (equip.range) {
      resultTooltip += `
        <div class="block">
          <div class="block-element">${this.i18nService.translateInstant('PARAM.RANGE') + ' ' + equip.range}</div>
      `;

      if (equip.physDamage) {
        resultTooltip += `<div>${
          this.i18nService.translateInstant('PARAM.PHYS_DAMAGE') + ' ' + equip.physDamage
        }</div>`;
      }

      if (equip.magicDamage) {
        resultTooltip += `<div>${
          this.i18nService.translateInstant('PARAM.MAGIC_DAMAGE') + ' ' + equip.magicDamage
        }</div>`;
      }

      resultTooltip += `</div>`;
    }

    if (equip.strength + equip.intellect + equip.armor + equip.will + equip.regeneration + equip.mind > 0) {
      resultTooltip += `
      <div class="params">
      `;
      if (equip.strength) {
        resultTooltip += `<div class="param">${
          this.i18nService.translateInstant('PARAM.STRENGTH') + ' +' + equip.strength
        }</div>`;
      }
      if (equip.intellect) {
        resultTooltip += `<div class="param">${
          this.i18nService.translateInstant('PARAM.INTELLECT') + ' +' + equip.intellect
        }</div>`;
      }
      if (equip.armor) {
        resultTooltip += `<div class="param">${
          this.i18nService.translateInstant('PARAM.ARMOR') + ' +' + equip.armor
        }</div>`;
      }
      if (equip.will) {
        resultTooltip += `<div class="param">${
          this.i18nService.translateInstant('PARAM.WILL') + ' +' + equip.will
        }</div>`;
      }
      if (equip.regeneration) {
        resultTooltip += `<div class="param">${
          this.i18nService.translateInstant('PARAM.REGENERATION') + ' +' + equip.regeneration
        }</div>`;
      }
      if (equip.mind) {
        resultTooltip += `<div class="param">${
          this.i18nService.translateInstant('PARAM.MIND') + ' +' + equip.mind
        }</div>`;
      }

      resultTooltip += `</div>`;
    }

    if (equip.cost || equip.energyCost) {
      resultTooltip += `
        <div class="block">
          <div class="block-element">${this.i18nService.translateInstant('PARAM.ENERGY') + ' ' + equip.energyCost}</div>
      `;

      if (equip.cost > 0) {
        resultTooltip += `<div class="block-element">`;
        for (let i = 0; i < equip.cost; i++) {
          resultTooltip += `<img src="./assets/icons/cut-diamond.png">`;
        }
        resultTooltip += `</div>`;
      }

      resultTooltip += `</div>`;
    }

    resultTooltip += `</div>`;

    return resultTooltip;
  }
}
