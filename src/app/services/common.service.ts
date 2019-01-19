import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post';

@Injectable()
export class CommonService {

  public addPost$ = new Subject();
  public editPost$ = new Subject();
  public postToEdit;

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
   * @param post - post do edycji
   */
  setPostToEdit(post: Post) {
    this.postToEdit = post;
    console.log('postToEdit: ', this.postToEdit);
    console.log(post);
    this.emitPostEdit();
  }

}
