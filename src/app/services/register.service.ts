import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn : 'root'
})
export class RegisterService {

  constructor(private _httpClient: HttpClient) { }

  /**
   * Metoda służy do pobrania wszystkich użytkowników z bazy
   */
  getUsers() {
    return this._httpClient.get('api/users');
  }

  /**
   * Metoda służy do dodania użytkownika do bazy
   * @param user - użytkownik do dodania
   */
  registerUser(user: User) {
    return this._httpClient.post('api/users', user);
  }
}
