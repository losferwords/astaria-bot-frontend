import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEquip } from 'src/app/interfaces/IEquip';
import { IHero } from 'src/app/interfaces/IHero';
import { BattleService } from 'src/app/services/battle.service';

@Component({
  selector: 'app-upgrade-modal',
  templateUrl: './upgrade.modal.html',
  styleUrls: ['./upgrade.modal.scss']
})
export class UpgradeModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { hero: IHero; crystals: number },
    private battleService: BattleService
  ) {}

  getEquipTooltip(equip: IEquip, heroId: string): string {
    return this.battleService.getEquipTooltip(equip, heroId);
  }
}
