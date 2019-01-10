import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector : 'app-login',
  templateUrl : './login-page.component.html',
  styleUrls : [ './login-page.component.css' ],
  providers : [ LoginService ]
})
export class LoginPageComponent {

  public user: User;

  constructor(private _loginService: LoginService, private _router: Router) {
    this.user = new User();
  }

  /**
   * Metoda służy do zweryfikowania czy wprowadzone dane logowania są prawidłowe.
   */
  validateLogin() {
    // TODO: Poprawić logowanie

    if (this.user.username === 'mka' && this.user.password === '123') {
      localStorage.setItem('loggedInUser', this.user.username);
      this._router.navigate([ '/home' ]);
    } else {
      alert('Nieprawidłowa nazwa użytkownika i/lub hasło');
    }
    // if (this.user.username && this.user.password) {
    //   this._loginService.validateLogin(this.user)
    //     .subscribe(result => {
    //       if (result[ 'status' ] === 'success') {
    //         localStorage.setItem('loggedInUser', this.user.username);
    //         this._router.navigate([ '/home' ]);
    //       } else {
    //         alert('Nieprawidłowa nazwa użytkownika i/lub hasło');
    //       }
    //     }, error => {
    //       console.log('Podczas logowania wystąpił błąd: ', error);
    //     });
    // } else {
    //   alert('Wprowadź login i hasło');
    // }
  }

}
