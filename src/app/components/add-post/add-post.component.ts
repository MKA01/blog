import { Component } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { CommonService } from '../../services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector : 'app-add-post',
  templateUrl : './add-post.component.html',
  styleUrls : [ './add-post.component.css' ],
  providers : [ PostService ]
})
export class AddPostComponent {

  public post: Post = new Post();
  private _addPostForm: FormGroup;

  constructor(private _postService: PostService,
              private _commonService: CommonService,
              private _formBuilder: FormBuilder) {
    this._addPostForm = _formBuilder.group({
      'title' : [ '', Validators.required ],
      'description' : [ '', Validators.required ],
      'tags' : [ '', Validators.required ]
    });
  }

  addPost() {
    this.post.title = this._addPostForm.get('title').value;
    this.post.description = this._addPostForm.get('description').value;
    this.post.user = localStorage.getItem('loggedUser');
    this.post.tags = this._addPostForm.get('tags').value.split(',');

    for (let i = 0; i < this.post.tags.length; i++) {
      this.post.tags[ i ] = this.post.tags[ i ].toLowerCase();
    }

    this._postService.addPost(this.post)
      .subscribe(() => {
        this._commonService.emitPostAdd();
        this._addPostForm.reset();
      });
  }

}
