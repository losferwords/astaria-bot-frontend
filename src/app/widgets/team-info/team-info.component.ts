import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAbility } from 'src/app/interfaces/IAbility';
import { IEquip } from 'src/app/interfaces/IEquip';
import { IHero } from 'src/app/interfaces/IHero';
import { IPet } from 'src/app/interfaces/IPet';
import { ITeam } from 'src/app/interfaces/ITeam';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss']
})
export class TeamInfoComponent {
  @Input() team: ITeam;
  @Input() activeHero: IHero;
  @Input() preparedWeapon: IEquip;
  @Input() preparedAbility: IAbility;
  @Input() preparedPetAbility: IAbility;
  @Input() activePet: IPet;
  @Output() endTurn: EventEmitter<void> = new EventEmitter<void>();
  @Output() prepareWeapon: EventEmitter<IEquip> = new EventEmitter<IEquip>();
  @Output() prepareAbility: EventEmitter<IAbility> = new EventEmitter<IAbility>();
  @Output() preparePetMove: EventEmitter<IPet> = new EventEmitter<IPet>();
  @Output() preparePetAbility: EventEmitter<{ ability: IAbility; pet: IPet }> = new EventEmitter<{
    ability: IAbility;
    pet: IPet;
  }>();
  @Output() openUpgradeModal: EventEmitter<IHero> = new EventEmitter<IHero>();

  onEndTurn() {
    this.endTurn.emit();
  }

  onPrepareWeapon(equip: IEquip) {
    this.prepareWeapon.emit(equip);
  }

  onPrepareAbility(ability: IAbility) {
    this.prepareAbility.emit(ability);
  }

  onPreparePetMove(pet: IPet) {
    this.preparePetMove.emit(pet);
  }

  onPreparePetAbility(value: { ability: IAbility; pet: IPet }) {
    this.preparePetAbility.emit({ ability: value.ability, pet: value.pet });
  }

  onOpenUpgradeModal(hero: IHero) {
    this.openUpgradeModal.emit(hero);
  }
}
