import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector : 'app-login',
  templateUrl : './login-page.component.html',
  styleUrls : [ './login-page.component.scss' ],
  providers : [ LoginService ]
})
export class LoginPageComponent implements OnInit {
  private _user: User = new User();
  private _wrongCaptcha: boolean;
  private _wrongCredentials: boolean;
  private _firstNumber: number;
  private _secondNumber: number;
  private _users: User[];

  constructor(private _loginService: LoginService,
              private _router: Router) {
    this._user = new User();
  }

  ngOnInit(): void {
    this._wrongCaptcha = false;
    this._wrongCredentials = false;
    this._firstNumber = Math.floor(Math.random() * 5 + 1);
    this._secondNumber = Math.floor(Math.random() * 5 + 1);
  }

  /**
   * Metoda służy do zweryfikowania czy wprowadzone dane logowania są prawidłowe.
   */
  private _validateCredentials(form: NgForm) {
    this._wrongCaptcha = false;
    this._wrongCredentials = false;
    const captcha = form.value.captcha;
    this._user.username = form.value.login;
    this._user.password = form.value.password;

    if (captcha !== (this._firstNumber + this._secondNumber)) {
      this._wrongCaptcha = true;
      return;
    }

    this._loginService.getUsers()
      .subscribe((response: User[]) => {
        this._users = response;
        for (let i = 0; i < this._users.length; i++) {
          if (this._users[ i ].username === this._user.username && this._users[ i ].password === this._user.password) {
            localStorage.setItem('loggedUser', this._user.username);
            this._router.navigate([ 'app/home' ]);
            return;
          }
        }
      });

    this._wrongCredentials = true;
  }

  /**
   * Metoda służy do przeniesienia do strony rejestracji po kliknięciu przycisku
   */
  private _navigateToRegisterPage() {
    this._router.navigate([ 'register' ]);
  }

}
