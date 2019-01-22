import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector : 'app-app-container',
  templateUrl : './app-container.component.html',
  styleUrls : [ './app-container.component.css' ]
})
export class AppContainerComponent implements OnInit {

  constructor(private _loginService: LoginService,
              private _router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem('loggedUser')) {
      this._router.navigate([ 'app/login' ]);
    }
  }

  /**
   * Metoda służy do wylogowania użytkownika
   */
  private _logOutButtonClick() {
    localStorage.removeItem('loggedUser');
    this._router.navigate([ 'login' ]);
  }

  private _homeButtonClick() {
    this._router.navigate([ 'app/home' ]);
  }

}
