import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { ActivatedRoute } from '@angular/router';
import { PostComment } from '../../models/post-comment';
import { CommonService } from '../../services/common.service';

@Component({
  selector : 'app-post',
  templateUrl : './post.component.html',
  styleUrls : [ './post.component.css' ]
})
export class PostComponent implements OnInit {

  @ViewChild('editCommentButton') editCommentButton: ElementRef;
  @ViewChild('closeButton') closeButton: ElementRef;
  @ViewChild('closeButton1') closeButton1: ElementRef;
  public post: Post = <Post>{};
  public postComments: PostComment[] = [];
  public commentToDelete: PostComment;
  public postComment: PostComment = <PostComment>{};

  constructor(private _postService: PostService,
              private _activatedRoute: ActivatedRoute,
              private _commonService: CommonService) {
    this._commonService.editComment$.subscribe(() => {
      this.editCommentButton.nativeElement.click();
    });
    this._commonService.addComment$.subscribe(() => {
      this._downloadPostDetail();
    });
  }

  ngOnInit() {
    this._downloadPostDetail();

    this._commonService.editComment$.subscribe(() => {
      this.postComment = this._commonService.commentToEdit;
    });
  }

  setEditComment(comment: PostComment) {
    this._commonService.setCommentToEdit(comment);
  }

  setCommentToDelete(comment: PostComment) {
    this.commentToDelete = comment;
  }

  cancelCommentDelete() {
    this.commentToDelete = null;
  }

  deleteComment() {
    this._postService.deleteComment(this.commentToDelete._id).subscribe(() => {
      this._downloadPostDetail();
      this.closeButton1.nativeElement.click();
    });
  }

  editComment() {
    this._postService.editComment(this.postComment, this.postComment._id)
      .subscribe(() => {
        this.closeButton.nativeElement.click();
        this._commonService.emitCommentAdd();
        this._commonService.commentToEdit = null;
      });
  }

  private _downloadPostDetail() {
    this._postService.loadPosts()
      .subscribe((posts: Post[]) => {
        this.post = posts.find(el => el._id === this._activatedRoute.snapshot.params[ 'id' ]);
        this._downloadPostComments(this.post._id);
      });
  }

  private _downloadPostComments(postId: string) {
    this.postComments = [];
    this._postService.loadComments()
      .subscribe((comments: PostComment[]) => {
        for (let i = 0; i < comments.length; i++) {
          if (comments[ i ].postId === postId) {
            this.postComments.push(comments[ i ]);
          }
        }
      });
  }
}
