import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() endTurn: EventEmitter<void> = new EventEmitter<void>();
  @Output() prepareWeapon: EventEmitter<IEquip> = new EventEmitter<IEquip>();
  @Output() openUpgradeModal: EventEmitter<IHero> = new EventEmitter<IHero>();

  constructor(private battleService: BattleService) {}

  getEquipTooltip(equip: IEquip, heroId: string): string {
    return this.battleService.getEquipTooltip(equip, heroId);
  }

  getAbilityTooltip(ability: IAbility, heroId: string): string {
    return this.battleService.getAbilityTooltip(ability, heroId);
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

  showUpgradePopup() {
    if (this.isActive) {
      this.openUpgradeModal.next(this.hero);
    }
  }
}
