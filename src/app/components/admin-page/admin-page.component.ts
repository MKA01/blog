import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { CommonService } from '../../services/common.service';

@Component({
  selector : 'app-admin-page',
  templateUrl : './admin-page.component.html',
  styleUrls : [ './admin-page.component.css' ]
})
export class AdminPageComponent implements OnInit {

  @ViewChild('cancelUserDeleteButton') cancelUserDeleteButton: ElementRef;
  @ViewChild('closeUserEditButton') closeUserEditButton: ElementRef;
  @ViewChild('cancelPostDeleteButton') cancelPostDeleteButton: ElementRef;
  @ViewChild('closeEditPostButton') closeEditPostButton: ElementRef;
  @ViewChild('editPostButton') editPostButton: ElementRef;
  @ViewChild('editUserButton') editUserButton: ElementRef;
  public posts: Post[] = [];
  public users: User[] = [];
  public postToDelete: Post;
  public userToDelete: User;
  public user: User = <User>{};
  public post: Post = <Post>{};

  constructor(private _postService: PostService,
              private _userService: UserService,
              private _commonService: CommonService) {
    this._commonService.editPost$.subscribe(() => {
      this.editPostButton.nativeElement.click();
    });

    this._commonService.editUser$.subscribe(() => {
      this.editUserButton.nativeElement.click();
    });
  }

  ngOnInit() {
    this.getPosts();
    this.getUsers();
    this._commonService.editPost$.subscribe(() => {
      this.post = this._commonService.postToEdit;
    });

    this._commonService.editUser$.subscribe(() => {
      this.user = this._commonService.userToEdit;
    });
  }

  /**
   * Metoda nasłuchuje na odpowiedź z bazy i zapisuje pobranych użytkowników do zmiennej
   */
  getUsers() {
    this._userService.getUsers()
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
    this._postService.deletePost(this.postToDelete._id)
      .subscribe(() => {
        this.getPosts();
        this.cancelPostDeleteButton.nativeElement.click();
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
        this.closeEditPostButton.nativeElement.click();
        this._commonService.emitPostAdd();
        this._commonService.postToEdit = null;
      });
  }

  /**
   * Metoda służy do przygotowania użytkownika do usunięcia
   * @param user - użytkownik do usunięcia
   */
  setUserToDelete(user: User) {
    this.userToDelete = user;
  }

  /**
   * Metoda służy do wyczyszczenia użytkownika do usunięcia po kliknięciu przycisku anuluj
   */
  cancelUserDelete() {
    this.userToDelete = null;
  }

  /**
   * Metoda służy do usunięcia użytkownika
   */
  deleteUser() {
    this._userService.deleteUser(this.userToDelete._id)
      .subscribe(() => {
        this.getPosts();
        this.cancelUserDeleteButton.nativeElement.click();
      });
  }

  /**
   * Metoda służy do edytowania użytkownika
   * @param user - użytkownik do edycji
   */
  setEditUser(user: User) {
    this._commonService.setUserToEdit(user);
  }

  /**
   * Metoda służy do zedytowania posta
   */
  editUser() {
    this._userService.editUser(this.user, this.user._id)
      .subscribe(() => {
        this.closeUserEditButton.nativeElement.click();
        this._commonService.emitUserAdd();
        this._commonService.userToEdit = null;
      });
  }
}
