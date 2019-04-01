import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn : 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient) { }

  getUsers() {
    return this._httpClient.get('https://mkablog.herokuapp.com/api/users');
  }

  registerUser(user: User) {
    return this._httpClient.post('https://mkablog.herokuapp.com/api/users', user);
  }

  editUser(user: User, id: string) {
    return this._httpClient.put(`https://mkablog.herokuapp.com/api/users/${ id }`, user);
  }
  
  deleteUser(id: string) {
    return this._httpClient.delete(`https://mkablog.herokuapp.com/api/users/${ id }`);
  }
}
