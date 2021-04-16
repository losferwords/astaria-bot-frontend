import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IEffect } from 'src/app/interfaces/IEffect';
import { IEquip } from 'src/app/interfaces/IEquip';
import { IHero } from 'src/app/interfaces/IHero';
import { I18nService } from 'src/app/services/i18n.service';

@Component({
  selector: 'app-hero-info',
  templateUrl: './hero-info.component.html',
  styleUrls: ['./hero-info.component.scss']
})
export class HeroInfoComponent {
  @Input() hero: IHero;
  @Input() isActive: boolean;
  @Input() preparedWeapon: IEquip;
  @Output() endTurn: EventEmitter<void> = new EventEmitter<void>();
  @Output() prepareWeapon: EventEmitter<IEquip> = new EventEmitter<IEquip>();

  constructor(private i18nService: I18nService) {}

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

  getEffects(effects: IEffect[], isBuff: boolean) {
    return effects.filter((effect: IEffect) => {
      return effect.isBuff === isBuff;
    });
  }

  endTurnClicked() {
    if (this.isActive) {
      this.endTurn.emit();
    }
  }

  prepareWeaponClicked(weapon: IEquip) {
    if (this.canUseWeapon(weapon)) {
      this.prepareWeapon.emit(weapon);
    }
  }

  canUseWeapon(weapon: IEquip): boolean {
    return (
      this.hero.energy - weapon.energyCost >= 0 &&
      !this.hero.isDisarmed &&
      !weapon.isUsed &&
      this.isActive &&
      !weapon.isPassive
    );
  }
}
