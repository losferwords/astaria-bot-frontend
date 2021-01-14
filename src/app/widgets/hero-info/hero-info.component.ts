import { Component, Input } from '@angular/core';
import { IEquip } from 'src/app/interfaces/iEquip';
import { IHero } from 'src/app/interfaces/IHero';

@Component({
  selector: 'app-hero-info',
  templateUrl: './hero-info.component.html',
  styleUrls: ['./hero-info.component.scss']
})
export class HeroInfoComponent {
    @Input() hero: IHero;
    @Input() isActive: boolean;

  constructor() {}

  getEquipTooltip(equip: IEquip): string {
    let resultTooltip =  `
      <div class="header">
        <div class="name">${equip.name}</div>
        <div class="level">Rank: ${equip.level}</div>
      </div>
    `;

    if (equip.range) {
      resultTooltip += `
        <div class="header">
          <div class="range">Radius ${equip.range}</div>
      `;

      if (equip.physDamage) {
        resultTooltip += `<div>Damage ${equip.physDamage}</div>`;
      }

      if (equip.magicDamage) {
        resultTooltip += `<div>Magic Damage ${equip.magicDamage}</div>`;
      }

      resultTooltip += `</div>`;
    }

    if (equip.strength > 0 || equip.intellect > 0 || equip.armor > 0 || equip.will > 0 || equip.regeneration > 0 || equip.mind > 0) {
      resultTooltip += `
      <div class="body">
      `;
      if (equip.strength) {
        resultTooltip += `<div class="property">Strength +${equip.strength}</div>`;
      }
      if (equip.intellect) {
        resultTooltip += `<div class="property">Intellect +${equip.intellect}</div>`;
      }
      if (equip.armor) {
        resultTooltip += `<div class="property">Armor +${equip.armor}</div>`;
      }
      if (equip.will) {
        resultTooltip += `<div class="property">Will +${equip.will}</div>`;
      }
      if (equip.regeneration) {
        resultTooltip += `<div class="property">Regeneration +${equip.regeneration}</div>`;
      }
      if (equip.mind) {
        resultTooltip += `<div class="property">Mind +${equip.mind}</div>`;
      }

      resultTooltip += `</div>`;
    }

    return resultTooltip;
  }
}
