import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { RegisterService } from './register.service';

@Injectable()
export class LoginService {

  private _users: User[];
  private _isLogged: boolean;

  constructor(private _httpClient: HttpClient,
              private _registerService: RegisterService) {
    // this._isLogged = true; // TODO: Wyrzucić to
  }

  get isLogged(): boolean {
    return this._isLogged;
  }

  /**
   * Metoda służy do zweryfikowania czy wprowadzone dane logowania istnieją w bazie
   * @param user - dane użytkownika
   */
  validateCredentials(user: User): boolean {
    this._registerService.getUsers()
      .subscribe((response: User[]) => {
        this._users = response;
      });

    for (let i = 0; i < this._users.length; i++) {
      if (this._users[ i ].username === user.username && this._users[ i ].password === user.password) {
        this._isLogged = true;
        return true;
      }
    }
    return false;
  }

}
