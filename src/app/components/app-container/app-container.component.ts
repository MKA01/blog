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

  private _logOutButtonClick() {
    localStorage.removeItem('loggedUser');
    this._router.navigate([ 'login' ]);
  }

  private _homeButtonClick() {
    this._router.navigate([ 'app/home' ]);
  }

  private _contactButtonClick() {
    this._router.navigate([ 'app/contact' ]);
  }

  private _adminButtonClicked() {
    this._router.navigate([ 'app/admin' ]);
  }

}
