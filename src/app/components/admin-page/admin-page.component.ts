import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import { CommonService } from '../../services/common.service';

@Component({
  selector : 'app-admin-page',
  templateUrl : './admin-page.component.html',
  styleUrls : [ './admin-page.component.css' ]
})
export class AdminPageComponent implements OnInit {

  @ViewChild('closeButton1') closeButton1: ElementRef;
  @ViewChild('closeButton') closeButton: ElementRef;
  @ViewChild('editPostButton') editPostButton: ElementRef;
  public posts: Post[] = [];
  public users: User[] = [];
  public postToDelete: Post;
  public post: Post = <Post>{};

  constructor(private _postService: PostService,
              private _loginService: LoginService,
              private _commonService: CommonService) {
    this._commonService.editPost$.subscribe(() => {
      this.editPostButton.nativeElement.click();
    });
  }

  ngOnInit() {
    this.getPosts();
    this.getUsers();
    this._commonService.editPost$.subscribe(() => {
      this.post = this._commonService.postToEdit;
    });
  }

  /**
   * Metoda nasłuchuje na odpowiedź z bazy i zapisuje pobranych użytkowników do zmiennej
   */
  getUsers() {
    this._loginService.getUsers()
      .subscribe((response: User[]) => {
        this.users = response;
      });
  }

  /**
   * Metoda nasłuchuje na odpowiedź z bazy i zapisuje pobrane posty do zmiennej
   */
  getPosts() {
    this._postService.loadPosts()
      .subscribe((response: Post[]) => {
        this.posts = response;
      });
  }

  /**
   * Metoda służy do przygotowania posta do usunięcia
   * @param post - post do usunięcia
   */
  setPostToDelete(post: Post) {
    this.postToDelete = post;
  }

  /**
   * Metoda służy do wyczyszczenia posta do usunięcia po kliknięciu przycisku anuluj
   */
  cancelPostDelete() {
    this.postToDelete = null;
  }

  /**
   * Metoda służy do usunięcia posta
   */
  deletePost() {
    this._postService.deletePost(this.postToDelete._id).subscribe(() => {
      this.getPosts();
      this.closeButton1.nativeElement.click();
    });
  }

  /**
   * Metoda służy do edytowania postu
   * @param post - post do edycji
   */
  setEditPost(post: Post) {
    this._commonService.setPostToEdit(post);
  }

  /**
   * Metoda służy do zedytowania posta
   */
  editPost() {
    this._postService.editPost(this.post, this.post._id)
      .subscribe(() => {
        this.closeButton.nativeElement.click();
        this._commonService.emitPostAdd();
        this._commonService.postToEdit = null;
      });
  }
}
