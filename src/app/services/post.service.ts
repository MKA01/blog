import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { PostComment } from '../models/post-comment';

@Injectable()
export class PostService {

  constructor(private _httpClient: HttpClient) {
  }

  loadPosts() {
    return this._httpClient.get('https://mkablog.herokuapp.com/api/posts');
  }

  addPost(post: Post) {
    return this._httpClient.post('https://mkablog.herokuapp.com/api/posts', post);
  }

  editPost(post: Post, id: string) {
    return this._httpClient.put(`https://mkablog.herokuapp.com/api/posts/${ id }`, post);
  }

  deletePost(id: string) {
    return this._httpClient.delete(`https://mkablog.herokuapp.com/api/posts/${ id }`);
  }

  loadComments() {
    return this._httpClient.get('https://mkablog.herokuapp.com/api/comments');
  }

  addComment(comment: PostComment) {
    return this._httpClient.post('https://mkablog.herokuapp.com/api/comments', comment);
  }

  editComment(comment: PostComment, id: string) {
    return this._httpClient.put(`https://mkablog.herokuapp.com/api/comments/${ id }`, comment);
  }

  deleteComment(id: string) {
    return this._httpClient.delete(`https://mkablog.herokuapp.com/api/comments/${ id }`);
  }
}
