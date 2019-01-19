import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { Http, Response } from '@angular/http';

@Injectable()
export class PostService {

  constructor(private _httpClient: Http) {
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
  addPost(post: Post): Promise<Post> {
    return this._httpClient.post('api/posts', post)
      .toPromise()
      .then(response => response.json() as Post)
      .catch(this.handleError);
  }

  /**
   * Metoda służy do zaktualizowania posta w bazie
   * @param post - post do zaktualizowania
   * @param id - id posta do zaktualizowania
   */
  editPost(post: Post, id: number) {
    return this._httpClient.put(`api/posts/${ id }`, post);
  }

  /**
   * Metoda służy do usunięcia posta z bazy
   * @param id - id posta
   */
  deletePost(id: number) {
    return this._httpClient.delete(`api/posts/${ id }`);
  }

  private handleError(error: any): Promise<any> {
    const errMsg = (error.message) ? error.message :
      error.status ? `${ error.status } - ${ error.statusText }` : 'Server error';
    console.error(errMsg); // log to console
    return Promise.reject(errMsg);
  }
}
