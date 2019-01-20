import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';

@Injectable({
  providedIn : 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private _loginService: LoginService,
              private _router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this._loginService.isLogged) {
      this._router.navigate([ 'login' ]);
      return false;
    }
    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this._loginService.isLogged) {
      this._router.navigate([ 'login' ]);
      return false;
    }
    return true;
  }
}
