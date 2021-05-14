import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  constructor(
    public dialogRef: MatDialogRef<UpgradeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { hero: IHero; crystals: number; heroData: IHeroData; battle: IBattle },
    private battleService: BattleService
  ) {
    this.hero = data.hero;
    this.crystals = data.crystals;
    this.heroData = data.heroData;
    this.battle = data.battle;
  }

  getEquipTooltip(equip: IEquip, heroId: string): string {
    return this.battleService.getEquipTooltip(equip, heroId);
  }

  upgradeIsAvailable(equipType: string, equip: IEquip): boolean {
    return (
      equip.level > this.hero[equipType].level &&
      equip.level - this.hero[equipType].level === 1 &&
      this.crystals >= equip.cost
    );
  }

  upgradeEquip(equipType: string, equip: IEquip) {
    if (this.upgradeIsAvailable(equipType, equip)) {
      this.dialogRef.close(this.hero[equipType].id);
    }
  }
}
