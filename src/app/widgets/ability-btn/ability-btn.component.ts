import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ability-btn',
  templateUrl: './ability-btn.component.html',
  styleUrls: ['./ability-btn.component.scss']
})
export class AbilityBtnComponent {
  @Input() classes: string[];
  @Input() tooltipText = '';
  @Input() icon: string;
  @Input() left: number;
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();

  btnClicked() {
    this.clicked.next();
  }
}
