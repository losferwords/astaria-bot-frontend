import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PageContentGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, { url }: RouterStateSnapshot): true | UrlTree {
    const state = this.router.getCurrentNavigation().extras.state;
    if (state && (state.data || state.backState)) {
      return true;
    } else {
      return this.router.parseUrl('/home');
    }
  }
}
