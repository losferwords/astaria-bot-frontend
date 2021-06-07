import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AbilityTargetType } from 'src/app/enums/ability-target-type.enum';
import { IAbility } from 'src/app/interfaces/IAbility';
import { IEffect } from 'src/app/interfaces/IEffect';
import { IEquip } from 'src/app/interfaces/IEquip';
import { IHero } from 'src/app/interfaces/IHero';
import { BattleService } from 'src/app/services/battle.service';
import { I18nService } from 'src/app/services/i18n.service';

@Component({
  selector: 'app-hero-info',
  templateUrl: './hero-info.component.html',
  styleUrls: ['./hero-info.component.scss']
})
export class HeroInfoComponent {
  @Input() hero: IHero;
  @Input() teamCrystals: number;
  @Input() isActive: boolean;
  @Input() preparedWeapon: IEquip;
  @Input() preparedAbility: IAbility;
  @Output() endTurn: EventEmitter<void> = new EventEmitter<void>();
  @Output() prepareWeapon: EventEmitter<IEquip> = new EventEmitter<IEquip>();
  @Output() prepareAbility: EventEmitter<IAbility> = new EventEmitter<IAbility>();
  @Output() openUpgradeModal: EventEmitter<IHero> = new EventEmitter<IHero>();

  constructor(private battleService: BattleService) {}

  getEquipTooltip(equip: IEquip, heroId: string): string {
    return this.battleService.getEquipTooltip(equip, heroId);
  }

  getAbilityTooltip(ability: IAbility, heroId: string): string {
    return this.battleService.getAbilityTooltip(ability, heroId);
  }

  getEffectTooltip(effect: IEffect, casterId: string): string {
    return this.battleService.getEffectTooltip(effect, casterId);
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

  prepareAbilityClicked(ability: IAbility) {
    if (this.checkAbilityForUse(ability)) {
      this.prepareAbility.emit(ability);
    }
  }

  canUseWeapon(weapon: IEquip): boolean {
    return (
      this.hero.energy - weapon.energyCost >= 0 &&
      (!this.hero.isDisarmed || this.hero.isImmuneToDisarm) &&
      !weapon.isUsed &&
      this.isActive &&
      !weapon.isPassive
    );
  }

  checkAbilityForUse(ability: IAbility): boolean {
    if (ability.targetType === AbilityTargetType.MOVE && this.hero.isImmobilized) {
      return false;
    }
    if (ability.needWeapon && this.hero.isDisarmed) {
      return false;
    }
    if (ability.isSpell && this.hero.isSilenced) {
      return false;
    }
    if (ability.left === 0 && this.hero.energy - ability.energyCost >= 0 && this.hero.mana - ability.manaCost >= 0) {
      return true;
    } else {
      return false;
    }
  }

  showUpgradePopup() {
    if (this.isActive) {
      this.openUpgradeModal.next(this.hero);
    }
  }
}
