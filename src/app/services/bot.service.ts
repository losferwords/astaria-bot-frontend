import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBattle } from '../interfaces/IBattle';
import { BotDataProvider } from '../dataproviders/bot.dataprovider';

@Injectable({
  providedIn: 'root'
})
export class BotService {
  constructor(private botDataProvider: BotDataProvider) {}

  botAction(): Observable<IBattle> {
    return this.botDataProvider.botAction();
  }
}
