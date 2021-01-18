import { Component } from '@angular/core';
import { I18nService } from './services/i18n.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'astaria-bot-frontend';

  constructor(private i18nService: I18nService) {
    this.i18nService.init();
  }
}
