import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IEffect } from 'src/app/interfaces/IEffect';
import { IEquip } from 'src/app/interfaces/IEquip';
import { IHero } from 'src/app/interfaces/IHero';
import { I18nService } from 'src/app/services/i18n.service';

@Component({
  selector: 'app-ability-btn',
  templateUrl: './ability-btn.component.html',
  styleUrls: ['./ability-btn.component.scss']
})
export class AbilityBtnComponent {
  @Input() classes: string[];
  @Input() tooltipText: string = '';
  @Input() icon: string;
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  btnClicked() {
    this.clicked.next();
  }
}
