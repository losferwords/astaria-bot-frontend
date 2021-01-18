import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Const } from '../static/const';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  constructor(private translateService: TranslateService) {}

  init() {
    this.translateService.setDefaultLang(Const.supportedLanguages[0] ? Const.supportedLanguages[0] : 'ru');
    const selectedLanguage = localStorage.getItem('selectedLanguage');
    if (selectedLanguage) {
      this.translateService.use(selectedLanguage);
    } else {
      const lang = this.translateService.getBrowserLang();
      for (const supportedLanguage of Const.supportedLanguages) {
        if (supportedLanguage === lang) {
          this.translateService.use(lang);
          break;
        }
      }
    }
  }

  translate(key: string | Array<string>, interpolateParams?: any) {
    return this.translateService.get(key, interpolateParams);
  }

  translateInstant(key: string | Array<string>, interpolateParams?: any) {
    return this.translateService.instant(key, interpolateParams);
  }

  changeLanguage(lang: string) {
    if (_.includes(Const.supportedLanguages, lang)) {
      this.translateService.use(lang);
      localStorage.setItem('selectedLanguage', lang);
    }
  }

  getSelectedLanguage() {
    const chosenLanguage = localStorage.getItem('selectedLanguage');
    return chosenLanguage ? chosenLanguage : this.translateService.getDefaultLang();
  }
}
