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
              private _commonService: CommonService) {}

  ngOnInit() {
    this._downloadPostDetail();

    this._commonService.addComment$.subscribe(() => {
      this._downloadPostDetail();
    });
  }

  /**
   * Metoda służy do edytowania komentarza
   * @param comment - komentarz do edycji
   */
  setEditComment(comment: PostComment) {
    this._commonService.setCommentToEdit(comment);
  }

  /**
   * Metoda służy do przygotowania komentarza do usunięcia
   * @param comment - komentarz do usunięcia
   */
  setCommentToDelete(comment: PostComment) {
    this.commentToDelete = comment;
  }

  /**
   * Metoda służy do wyczyszczenia komentarza do usunięcia po kliknięciu przycisku anuluj
   */
  cancelCommentDelete() {
    this.commentToDelete = null;
  }

  /**
   * Metoda służy do usunięcia komentarza
   */
  deleteComment() {
    this._postService.deleteComment(this.commentToDelete._id).subscribe(() => {
      this._downloadPostDetail();
      this.closeButton1.nativeElement.click();
    });
  }

  /**
   * Metoda służy do zedytowania komentarza
   */
  editComment() {
    this._postService.editComment(this.postComment, this.postComment._id)
      .subscribe(() => {
        this.closeButton.nativeElement.click();
        this._commonService.emitCommentAdd();
        this._commonService.commentToEdit = null;
      });
  }

  /**
   * Metoda służy do pobrania danych posta do wyświetlenia
   */
  private _downloadPostDetail() {
    this._postService.loadPosts()
      .subscribe((posts: Post[]) => {
        this.post = posts.find(el => el._id === this._activatedRoute.snapshot.params[ 'id' ]);
        this._downloadPostComments(this.post._id);
      });
  }

  /**
   * Metoda służy do pobrania komentarzy do posta po id posta
   * @param postId - id posta
   */
  private _downloadPostComments(postId: string) {
    this._postService.loadComments()
      .subscribe((comments: PostComment[]) => {
        this.postComments.push(comments.find(el => el.postId === postId));
      });
  }
}
