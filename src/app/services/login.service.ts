import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private _httpClient: HttpClient) {
    // this._isLogged = true; // TODO: Wyrzucić to
  }

  private _isLogged: boolean;

  get isLogged(): boolean {
    return this._isLogged;
  }

  set isLogged(value: boolean) {
    this._isLogged = value;
  }

  /**
   * Metoda służy do pobrania użytkowników z bazy
   */
  getUsers() {
    return this._httpClient.get('api/users');
  }

}
