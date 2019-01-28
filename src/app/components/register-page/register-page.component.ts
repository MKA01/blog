import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector : 'app-register-page',
  templateUrl : './register-page.component.html',
  styleUrls : [ './register-page.component.scss' ]
})
export class RegisterPageComponent implements OnInit {
  private _userExists: boolean;
  private _wrongCaptcha: boolean;
  private _wrongSymbols: boolean;
  private _firstNumber: number;
  private _secondNumber: number;
  private _regex: string;
  private _users: User[];
  private _user: User = new User();

  constructor(private _router: Router,
              private _userService: UserService) { }

  ngOnInit() {
    this._userExists = false;
    this._wrongCaptcha = false;
    this._wrongSymbols = false;
    this._firstNumber = Math.floor(Math.random() * 10);
    this._secondNumber = Math.floor(Math.random() * 10);
    this._regex = '[a-zA-Z0-9]';
  }

  register(form: NgForm) {
    this._userExists = false;
    this._wrongCaptcha = false;
    this._wrongSymbols = false;
    const captcha = form.value.captcha;
    this._user.username = form.value.login;
    this._user.password = form.value.password;

    if (captcha !== (this._firstNumber + this._secondNumber)) {
      this._wrongCaptcha = true;
      return;
    }

    if (!this._user.password.match(this._regex) || !this._user.username.match(this._regex)) {
      this._wrongSymbols = true;
      return;
    }

    this._userService.getUsers()
      .subscribe((response: User[]) => {
        this._users = response;
        for (let i = 0; i < this._users.length; i++) {
          if (this._users[ i ].username === this._user.username) {
            this._userExists = true;
            return;
          }
          if (!this._userExists) {
            this._userService.registerUser(this._user)
              .subscribe(() => {
                this._backToLogin();
              });
          }
        }
      });
  }

  private _backToLogin() {
    this._router.navigate([ 'login' ]);
  }

}
