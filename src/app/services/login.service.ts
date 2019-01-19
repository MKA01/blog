import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable()
export class LoginService {

  constructor(private _httpClient: HttpClient) {

  }

  /**
   * Metoda służy do zweryfikowania czy wprowadzone dane logowania istnieją w bazie
   * @param user - dane użytkownika
   */
  validateLogin(user: User) {
    // TODO: Poprawić walidacje użytkownika z bazą
    return true;

    // return this._httpClient.post('api/users/0', {
    //   username : user.username,
    //   password : user.password
    // });
  }

}
