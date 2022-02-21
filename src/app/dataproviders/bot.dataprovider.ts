import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBattle } from '../interfaces/IBattle';
import { HttpService } from '../services/http.service';
import { Const } from '../static/const';
import { BaseDataProvider } from './base.dataprovider';

@Injectable({
  providedIn: 'root'
})
export class BotDataProvider extends BaseDataProvider {
  constructor(private httpService: HttpService) {
    super();
  }

  botAction(): Observable<IBattle> {
    const headers = new HttpHeaders();
    return this.httpService.post(this.getApiUrl(Const.apiBotAction), {}, headers) as Observable<IBattle>;
  }
}
