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
import { IAbility } from '../interfaces/IAbility';
import { IEffect } from '../interfaces/IEffect';

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  constructor(private battleDataProvider: BattleDataProvider, private i18nService: I18nService) {}

  updateBattleState(oldState: IBattle, newState: IBattle) {
    oldState.queue = newState.queue;
    oldState.scenario = newState.scenario;
    oldState.crystalPositions = newState.crystalPositions;
    oldState.mapEffects = newState.mapEffects;
    oldState.log = newState.log;
    for (let i = 0; i < oldState.teams.length; i++) {
      oldState.teams[i].crystals = newState.teams[i].crystals;
      for (let j = 0; j < oldState.teams[i].heroes.length; j++) {
        for (const key in oldState.teams[i].heroes[j]) {
          if (key === 'pets') {
            if (oldState.teams[i].heroes[j].pets.length < newState.teams[i].heroes[j].pets.length) {
              // new Pet summoned
              oldState.teams[i].heroes[j][key] = newState.teams[i].heroes[j][key];
            } else {
              // pets update
              for (let k = oldState.teams[i].heroes[j].pets.length - 1; k >= 0; k--) {
                const petForUpdate = newState.teams[i].heroes[j].pets.find(
                  (p) => p.id === oldState.teams[i].heroes[j].pets[k].id
                );
                if (petForUpdate) {
                  // update existing pet
                  for (const petKey in oldState.teams[i].heroes[j].pets[k]) {
                    oldState.teams[i].heroes[j].pets[k][petKey] = petForUpdate[petKey];
                  }
                } else {
                  // old Pet is dead
                  oldState.teams[i].heroes[j].pets.splice(k, 1);
                }
              }
            }
          } else {
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

  getMovePoints(petId?: string): Observable<IPosition[]> {
    return this.battleDataProvider.getMovePoints(petId);
  }

  moveChar(position: IPosition, petId?: string): Observable<IBattle> {
    return this.battleDataProvider.moveChar(position, petId);
  }

  endTurn(): Observable<IBattle> {
    return this.battleDataProvider.endTurn();
  }

  findEnemies(
    sourceCharId: string,
    radius: number,
    includeInvisible: boolean,
    abilityId: string,
    ignoreRaytrace: boolean
  ): Observable<string[]> {
    return this.battleDataProvider.findEnemies(sourceCharId, radius, includeInvisible, abilityId, ignoreRaytrace);
  }

  findAllies(
    sourceCharId: string,
    radius: number,
    includeInvisible: boolean,
    includeSelf: boolean,
    ignoreRaytrace: boolean
  ): Observable<string[]> {
    return this.battleDataProvider.findAllies(sourceCharId, radius, includeInvisible, includeSelf, ignoreRaytrace);
  }

  findHeroes(
    sourceCharId: string,
    radius: number,
    includeInvisible: boolean,
    includeSelf: boolean,
    ignoreRaytrace: boolean
  ): Observable<string[]> {
    return this.battleDataProvider.findHeroes(sourceCharId, radius, includeInvisible, includeSelf, ignoreRaytrace);
  }

  getMapAbilityPositions(
    abilityId: string,
    ignoreRaytrace: boolean,
    ignoreObstacles: boolean
  ): Observable<IPosition[]> {
    return this.battleDataProvider.getMapAbilityPositions(abilityId, ignoreRaytrace, ignoreObstacles);
  }

  useWeapon(targetId: string, weaponId: string): Observable<IBattle> {
    return this.battleDataProvider.useWeapon(targetId, weaponId);
  }

  castAbility(abilityId: string, targetId: string, position: IPosition): Observable<IBattle> {
    return this.battleDataProvider.castAbility(abilityId, targetId, position);
  }

  upgradeEquip(equipId: string): Observable<IBattle> {
    return this.battleDataProvider.upgradeEquip(equipId);
  }

  learnAbility(abilityId: string): Observable<IBattle> {
    return this.battleDataProvider.learnAbility(abilityId);
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

    if (equip.strength || equip.intellect || equip.armor || equip.will || equip.regeneration || equip.mind) {
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
      resultTooltip += `<div class="block">`;

      if (equip.energyCost > 0) {
        resultTooltip += `<div class="block-element">${
          this.i18nService.translateInstant('PARAM.ENERGY') + ' ' + equip.energyCost
        }</div>`;
      } else {
        resultTooltip += `<div class="block-element"></div>`;
      }

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

  getAbilityTooltip(ability: IAbility, heroId: string): string {
    let resultTooltip = `
      <div class="block">
        <div class="block-element">${this.i18nService.translateInstant(
          'ABILITY.' + heroId + '.' + ability.id + '.NAME'
        )}</div>
    `;

    if (ability.level) {
      resultTooltip += `
      <div class="block-element">
          <img src="./assets/icons/upgrade.png">
          <div class="value">${ability.level}</div>
        </div>
      `;
    }

    resultTooltip += '</div>';

    if (ability.isPassive) {
      resultTooltip += `
      <div class="block">
        <div class="block-element text-center">${this.i18nService.translateInstant('ABILITY.PASSIVE')}</div>
      </div>
    `;
    } else {
      if (ability.range === 0) {
        resultTooltip += `
          <div class="block">
            <div class="block-element">${this.i18nService.translateInstant('PARAM.ON_SELF')}</div>
        `;
      } else if (ability.range === 100) {
        resultTooltip += `
        <div class="block">
          <div class="block-element">${this.i18nService.translateInstant('PARAM.ALL_FIELD')}</div>
      `;
      } else {
        resultTooltip += `
          <div class="block">
            <div class="block-element">${this.i18nService.translateInstant('PARAM.RANGE') + ' ' + ability.range}</div>
        `;
      }

      resultTooltip += `<div>${this.i18nService.translateInstant('PARAM.CD') + ' ' + ability.cd}</div>`;

      resultTooltip += `</div>`;
    }

    resultTooltip += `
      <div class="params">
        <div class="param">${this.i18nService.translateInstant('ABILITY.' + heroId + '.' + ability.id + '.DESC')}</div>
      </div>
      `;

    if (ability.isPassive) {
      if (ability.needWeapon || ability.isSpell) {
        resultTooltip += `<div class="block footer">`;

        if (ability.needWeapon) {
          resultTooltip += `<img class="center" src="./assets/icons/crossed-swords.png">`;
        }

        if (ability.isSpell) {
          resultTooltip += `<img class="center" src="./assets/icons/magic-swirl.png">`;
        }

        resultTooltip += `</div>`;
      }
    } else if (ability.needWeapon || ability.isSpell || ability.energyCost > 0 || ability.manaCost > 0) {
      resultTooltip += `<div class="block footer">`;

      if (ability.needWeapon) {
        resultTooltip += `<img class="center" src="./assets/icons/crossed-swords.png">`;
      }

      if (ability.isSpell) {
        resultTooltip += `<img class="center" src="./assets/icons/magic-swirl.png">`;
      }

      resultTooltip += `<div class="block-element">${
        this.i18nService.translateInstant('PARAM.ENERGY') + ' ' + ability.energyCost
      }</div>`;

      resultTooltip += `<div class="block-element">${
        this.i18nService.translateInstant('PARAM.MANA') + ' ' + ability.manaCost
      }</div>`;

      resultTooltip += `</div>`;
    }

    resultTooltip += `</div>`;
    return resultTooltip;
  }

  getEffectTooltip(effect: IEffect, casterId: string): string {
    let resultTooltip = `
      <div class="block">
        <div class="block-element">${this.i18nService.translateInstant(
          'EFFECT.' + casterId + '.' + effect.id + '.NAME'
        )}</div>
        <div class="block-element">
        </div>
      </div>
    `;

    resultTooltip += `
      <div class="block">
        <div class="block-element text-center">${
          effect.duration < 100
            ? this.i18nService.translateInstant('PARAM.DURATION') + ' ' + effect.duration
            : this.i18nService.translateInstant('PARAM.ENDLESS_DURATION')
        }</div>
      </div>`;

    resultTooltip += `
      <div class="params">
        <div class="param">${this.i18nService.translateInstant('EFFECT.' + casterId + '.' + effect.id + '.DESC')}</div>
      </div>
      `;
    return resultTooltip;
  }
}
