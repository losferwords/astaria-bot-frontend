import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PageContentGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): true | UrlTree {
    const state = this.router.getCurrentNavigation().extras.state;
    if (state && (state.data || state.backState)) {
      return true;
    } else {
      return this.router.parseUrl('/home');
    }
  }
}
