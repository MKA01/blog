import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';

@Injectable()
export class AddPostService {

  constructor(private http: HttpClient) {

  }

  addPost(post: Post) {
    return this.http.post('api/posts', {
      title : post.title,
      description : post.description
    });
  }

  updatePost(post: Post) {
    return this.http.post('api/posts', {
      id : post._id,
      title : post.title,
      description : post.description
    });
  }

}