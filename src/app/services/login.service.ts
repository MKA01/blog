import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn : 'root'
})
export class LoginService {

  constructor(private _httpClient: HttpClient) {
  }

  /**
   * Metoda służy do pobrania użytkowników z bazy
   */
  getUsers() {
    return this._httpClient.get('https://mkablog.herokuapp.com/api/users');
  }

}
