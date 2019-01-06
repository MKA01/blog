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
  getPosts() {
    return this._httpClient.post('/api/post/getPosts', {});
  }

  /**
   * Metoda służy do dodania posta do bazy
   * @param post - post do dodania
   */
  addPost(post: Post) {
    return this._httpClient.post('/api/post/createPost', {
      title : post.title,
      description : post.description
    });
  }

  /**
   * Metoda służy do zaktualizowania posta w bazie
   * @param post - post do zaktualizowania
   */
  updatePost(post: Post) {
    return this._httpClient.post('/api/post/updatePost', {
      id : post._id,
      title : post.title,
      description : post.description
    });
  }

  /**
   * Metoda służy do usunięcia posta z bazy
   * @param id - id posta
   */
  deletePost(id) {
    return this._httpClient.post('/api/post/deletePost', { id : id });
  }
}
