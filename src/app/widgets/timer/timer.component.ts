import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  @Input() maxValue = 0;

  @Input() set active(value: boolean) {
    if (value) {
      this.timer = this.maxValue;
      this.botThinkStartTime = +new Date();
      this.thinkInterval = setInterval(() => {
        this.timer = this.maxValue - (+new Date() - this.botThinkStartTime);
        if (this.timer <= 0) {
          clearInterval(this.thinkInterval);
        }
      }, 100);
    } else {
      this.timer = 0;
      this.botThinkStartTime = 0;
      clearInterval(this.thinkInterval);
    }
  }

  timer: number = 0;
  botThinkStartTime: number = 0;
  thinkInterval;

  constructor() {}
}
