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
  private _wrongCaptcha: boolean;
  private _wrongCredentials: boolean;
  private _firstNumber: number;
  private _secondNumber: number;
  public user: User;

  constructor(private _loginService: LoginService, private _router: Router) {
    this.user = new User();
  }

  ngOnInit(): void {
    this._wrongCaptcha = false;
    this._wrongCredentials = false;
    this._firstNumber = Math.floor(Math.random() * 10);
    this._secondNumber = Math.floor(Math.random() * 10);
  }

  /**
   * Metoda służy do zweryfikowania czy wprowadzone dane logowania są prawidłowe.
   */
  validateCredentials(form: NgForm) {
    this._wrongCaptcha = false;
    this._wrongCredentials = false;
    const captcha = form.value.captcha;

    if (captcha !== (this._firstNumber + this._secondNumber)) {
      this._wrongCaptcha = true;
      return;
    }

    if (this._loginService.validateCredentials(this.user)) {
      localStorage.setItem('loggedUser', this.user.username);
      this._router.navigate([ 'app/home' ]);
    } else {
      this._wrongCredentials = true;
    }
  }

  /**
   * Metoda służy do przeniesienia do strony rejestracji po kliknięciu przycisku
   */
  private _navigateToRegisterPage() {
    this._router.navigate([ 'register' ]);
  }

}
