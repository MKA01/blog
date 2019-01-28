import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post';
import { PostComment } from '../models/post-comment';

@Injectable()
export class CommonService {

  public addPost$ = new Subject();
  public editPost$ = new Subject();
  public addComment$ = new Subject();
  public editComment$ = new Subject();
  public postToEdit;
  public commentToEdit;

  constructor() {
    this.postToEdit = new Post();
  }

  /**
   * Metoda służy do wyemitowania zdarzenia informującego o dodaniu posta
   */
  emitPostAdd() {
    this.addPost$.next();
  }

  /**
   * Metoda służy do wyemitowania zdarzenia informującego o edycji posta
   */
  emitPostEdit() {
    this.editPost$.next();
  }

  /**
   * Metoda służy do pobrania posta do edycji
   * @param post - comment do edycji
   */
  setPostToEdit(post: Post) {
    this.postToEdit = post;
    this.emitPostEdit();
  }

  emitCommentAdd() {
    this.addComment$.next();
  }

  emitCommentEdit() {
    this.editComment$.next();
  }

  setCommentToEdit(comment: PostComment) {
    this.commentToEdit = comment;
    this.emitCommentEdit();
  }

}
