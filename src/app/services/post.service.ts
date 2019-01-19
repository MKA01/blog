import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';

@Injectable()
export class PostService {

  constructor(private _httpClient: HttpClient) {
  }

  /**
   * Metoda służy do pobrania wszystkich postów z bazy
   */
  loadPosts() {
    return this._httpClient.get('https://blog-json-server.herokuapp.com/posts');
  }

  /**
   * Metoda służy do dodania posta do bazy
   * @param post - post do dodania
   */
  addPost(post: Post) {
    return this._httpClient.post('https://blog-json-server.herokuapp.com/posts', post);
  }

  /**
   * Metoda służy do zaktualizowania posta w bazie
   * @param post - post do zaktualizowania
   * @param id - id posta do zaktualizowania
   */
  editPost(post: Post, id: number) {
    return this._httpClient.put(`https://blog-json-server.herokuapp.com/posts/${ id }`, post);
  }

  /**
   * Metoda służy do usunięcia posta z bazy
   * @param id - id posta
   */
  deletePost(id: number) {
    return this._httpClient.delete(`https://blog-json-server.herokuapp.com/posts/${ id }`);
  }
}
