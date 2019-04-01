import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post';
import { PostComment } from '../models/post-comment';
import { User } from '../models/user';

@Injectable()
export class CommonService {

  public addPost$ = new Subject();
  public editPost$ = new Subject();
  public addComment$ = new Subject();
  public editComment$ = new Subject();
  public addUser$ = new Subject();
  public editUser$ = new Subject();
  public postToEdit;
  public commentToEdit;
  public userToEdit;

  constructor() {
    this.postToEdit = new Post();
  }

  emitPostAdd() {
    this.addPost$.next();
  }

  emitPostEdit() {
    this.editPost$.next();
  }

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

  emitUserAdd() {
    this.addUser$.next();
  }

  emitUserEdit() {
    this.editUser$.next();
  }

  setUserToEdit(user: User) {
    this.userToEdit = user;
    this.emitUserEdit();
  }

}
