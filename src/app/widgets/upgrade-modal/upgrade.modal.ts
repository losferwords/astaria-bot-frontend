import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAbility } from 'src/app/interfaces/IAbility';
import { IBattle } from 'src/app/interfaces/IBattle';
import { IEquip } from 'src/app/interfaces/IEquip';
import { IHero } from 'src/app/interfaces/IHero';
import { IHeroData } from 'src/app/interfaces/IHeroData';
import { BattleService } from 'src/app/services/battle.service';

@Component({
  selector: 'app-upgrade-modal',
  templateUrl: './upgrade.modal.html',
  styleUrls: ['./upgrade.modal.scss']
})
export class UpgradeModalComponent {
  hero: IHero;
  crystals: number;
  heroData: IHeroData;
  battle: IBattle;
  isActiveHero: boolean;

  constructor(
    public dialogRef: MatDialogRef<UpgradeModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { hero: IHero; crystals: number; heroData: IHeroData; battle: IBattle; isActiveHero: boolean },
    private battleService: BattleService
  ) {
    this.hero = data.hero;
    this.crystals = data.crystals || data.hero.crystals;
    this.heroData = data.heroData;
    this.battle = data.battle;
    this.isActiveHero = data.isActiveHero;
  }

  getEquipTooltip(equip: IEquip, heroId: string): string {
    return this.battleService.getEquipTooltip(equip, heroId);
  }

  getAbilityTooltip(ability: IAbility, heroId: string): string {
    return this.battleService.getAbilityTooltip(ability, heroId);
  }

  equipUpgradeIsAvailable(equipType: string, equip: IEquip): boolean {
    return (
      this.isActiveHero &&
      equip.level > this.hero[equipType].level &&
      equip.level - this.hero[equipType].level === 1 &&
      this.crystals >= equip.cost
    );
  }

  upgradeEquip(equipType: string, equip: IEquip) {
    if (this.equipUpgradeIsAvailable(equipType, equip)) {
      this.dialogRef.close({ equipId: this.hero[equipType].id });
    }
  }

  abilityUpgradeIsAvailable(ability: IAbility): boolean {
    return (
      this.isActiveHero &&
      ability.level - this.hero.abilities.length === 1 &&
      (ability.level === 1 || this.crystals > 0)
    );
  }

  upgradeAbility(ability: IAbility) {
    if (this.abilityUpgradeIsAvailable(ability)) {
      this.dialogRef.close({ abilityId: ability.id });
    }
  }

  heroHasAbility(abilityId: string) {
    return this.hero.abilities.find((a) => a.id === abilityId);
  }

  autoChoose(isAutoBattle: boolean) {
    this.dialogRef.close({ auto: { isAutoBattle } });
  }
}
