import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector : 'app-app-container',
  templateUrl : './app-container.component.html',
  styleUrls : [ './app-container.component.css' ]
})
export class AppContainerComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem('loggedInUser')) {
      this._router.navigate([ 'app/login' ]);
    }
  }

  /**
   * Metoda służy do wylogowania użytkownika
   */
  private _logOutButtonClick() {
    localStorage.removeItem('loggedInUser');
    this._router.navigate([ 'login' ]);
  }

  private _homeButtonClick() {
    this._router.navigate([ 'app/home' ]);
  }

}
