import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector : 'app-app-container',
  templateUrl : './app-container.component.html',
  styleUrls : [ './app-container.component.css' ]
})
export class AppContainerComponent implements OnInit {

  constructor(private _userService: UserService,
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

  /**
   * Metoda służy do przeniesienia użytkownika do strony głównej
   */
  private _homeButtonClick() {
    this._router.navigate([ 'app/home' ]);
  }

  /**
   * Metoda służy do przeniesienia użytkownika do formularza kontaktowego
   */
  private _contactButtonClick() {
    this._router.navigate([ 'app/contact' ]);
  }

  /**
   * Metoda służy do przedniesienia użytkownika do panelu administratora
   */
  private _adminButtonClicked() {
    this._router.navigate([ 'app/admin' ]);
  }

}
