import { Injectable } from "@angular/core";

import { AuthService } from "./auth.service";
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    if (!this.auth.isLoggedIn()) {
      return true;
    }

    const returnUrl =
      route.queryParamMap.get('returnUrl') || '/c/patterns/main';

    return this.router.parseUrl(returnUrl);
  } 
}