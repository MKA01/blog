import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn : 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private _router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if (localStorage.getItem('loggedUser') === null) {
    //   this._router.navigate([ 'login' ]);
    //   return false;
    // }
    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if (localStorage.getItem('loggedUser') === null) {
    //   this._router.navigate([ 'login' ]);
    //   return false;
    // }
    return true;
  }


}
