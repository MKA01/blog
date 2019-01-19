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
    return this._httpClient.get('api/posts');
  }

  /**
   * Metoda służy do dodania posta do bazy
   * @param post - post do dodania
   */
  addPost(post: Post) {
    return this._httpClient.post('api/posts', post);
  }

  /**
   * Metoda służy do zaktualizowania posta w bazie
   * @param post - post do zaktualizowania
   * @param id - id posta do zaktualizowania
   */
  editPost(post: Post, id: string) {
    return this._httpClient.put(`api/posts/${ id }`, post);
  }

  /**
   * Metoda służy do usunięcia posta z bazy
   * @param id - id posta
   */
  deletePost(id: string) {
    return this._httpClient.delete(`api/posts/${ id }`);
  }
}
