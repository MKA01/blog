import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
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
  private _user: User;

  constructor(private _router: Router,
              private _registerService: RegisterService) { }

  ngOnInit() {
    this._userExists = false;
    this._wrongCaptcha = false;
    this._wrongSymbols = false;
    this._firstNumber = Math.floor(Math.random());
    this._secondNumber = Math.floor(Math.random());
    this._regex = '[a-zA-Z0-9]';
  }

  register(form: NgForm) {
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

    if (this._checkIfUserExists) {
      this._userExists = true;
      return;
    }

    this._registerService.registerUser(this._user)
      .subscribe(() => {
        this._router.navigate([ 'login' ]);
      });
  }

  /**
   * Metoda nasłuchuje na odpowiedź z bazy i zapisuje pobranych użytkowników do zmiennej
   */
  private _getUsers() {
    this._registerService.getUsers()
      .subscribe((response: User[]) => {
        this._users = response;
      });
  }

  /**
   * Metoda sprawdza czy w bazie istnieje już użytkownik o podanym loginie
   * @param login - login
   */
  private _checkIfUserExists(login: string): boolean {
    this._getUsers();

    for (let i = 0; i < this._users.length; i++) {
      if (this._users[ i ].username === login) {
        return true;
      }
    }
    return false;
  }

}
