import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { PostComment } from '../models/post-comment';

@Injectable()
export class PostService {

  constructor(private _httpClient: HttpClient) {
  }

  /**
   * Metoda służy do pobrania wszystkich postów z bazy
   */
  loadPosts() {
    return this._httpClient.get('https://mkablog.herokuapp.com/api/posts');
  }

  /**
   * Metoda służy do dodania posta do bazy
   * @param post - comment do dodania
   */
  addPost(post: Post) {
    return this._httpClient.post('https://mkablog.herokuapp.com/api/posts', post);
  }

  /**
   * Metoda służy do zaktualizowania posta w bazie
   * @param post - comment do zaktualizowania
   * @param id - id posta do zaktualizowania
   */
  editPost(post: Post, id: string) {
    return this._httpClient.put(`https://mkablog.herokuapp.com/api/posts/${ id }`, post);
  }

  /**
   * Metoda służy do usunięcia posta z bazy
   * @param id - id posta
   */
  deletePost(id: string) {
    return this._httpClient.delete(`https://mkablog.herokuapp.com/api/posts/${ id }`);
  }

  /**
   * Metoda służy do pobrania wszystkich komentarzy do postów z bazy
   */
  loadComments() {
    return this._httpClient.get('https://mkablog.herokuapp.com/api/comments');
  }

  /**
   * Metoda służy do dodania komentarza do posta do bazy
   * @param comment - komentarz do dodania
   */
  addComment(comment: PostComment) {
    return this._httpClient.post('https://mkablog.herokuapp.com/api/comments', comment);
  }

  /**
   * Metoda służy do zaktualizowania komentarza w bazie
   * @param comment - komentarz do zaktualizowania
   * @param id - id komentarza do zaktualizowania
   */
  editComment(comment: PostComment, id: string) {
    return this._httpClient.put(`https://mkablog.herokuapp.com/api/comments/${ id }`, comment);
  }

  /**
   * Metoda służy do usunięcia komentarza z bazy
   * @param id - id komentarza
   */
  deleteComment(id: string) {
    return this._httpClient.delete(`https://mkablog.herokuapp.com/api/comments/${ id }`);
  }
}
