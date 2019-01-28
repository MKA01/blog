import { Component, OnInit } from '@angular/core';
import { PostComment } from '../../models/post-comment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector : 'app-add-comment',
  templateUrl : './add-comment.component.html',
  styleUrls : [ './add-comment.component.css' ]
})
export class AddCommentComponent implements OnInit {

  public comment: PostComment = new PostComment();

  private _addCommentForm: FormGroup;

  constructor(private _postService: PostService,
              private _activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _commonService: CommonService) {
    this._addCommentForm = _formBuilder.group({
      'description' : [ '', Validators.required ]
    });
  }

  ngOnInit() {
  }

  /**
   * Metoda służy do dodania posta z danych wprowadzonych w formularzu
   */
  addComment() {
    this.comment.description = this._addCommentForm.get('description').value;
    this.comment.user = localStorage.getItem('loggedUser');
    this.comment.postId = this._activatedRoute.snapshot.params[ 'id' ];

    this._postService.addComment(this.comment)
      .subscribe(() => {
        this._commonService.emitCommentAdd();
        this._addCommentForm.reset();
      });
  }
}
