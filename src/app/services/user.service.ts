import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn : 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient) { }

  /**
   * Metoda służy do pobrania wszystkich użytkowników z bazy
   */
  getUsers() {
    return this._httpClient.get('https://mkablog.herokuapp.com/api/users');
  }

  /**
   * Metoda służy do dodania użytkownika do bazy
   * @param user - użytkownik do dodania
   */
  registerUser(user: User) {
    return this._httpClient.post('https://mkablog.herokuapp.com/api/users', user);
  }

  /**
   * Metoda służy do zaktualizowania danych użytkownika w bazie
   * @param user - comment do zaktualizowania
   * @param id - id posta do zaktualizowania
   */
  editUser(user: User, id: string) {
    return this._httpClient.put(`https://mkablog.herokuapp.com/api/users/${ id }`, user);
  }

  /**
   * Metoda służy do usunięcia użytkownika z bazy
   * @param id - id użytkownika
   */
  deleteUser(id: string) {
    return this._httpClient.delete(`https://mkablog.herokuapp.com/api/users/${ id }`);
  }
}
