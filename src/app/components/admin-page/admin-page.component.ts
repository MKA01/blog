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

  getUsers() {
    this._userService.getUsers()
      .subscribe((response: User[]) => {
        this.users = response;
      });
  }

  getPosts() {
    this._postService.loadPosts()
      .subscribe((response: Post[]) => {
        this.posts = response;
      });
  }

  setPostToDelete(post: Post) {
    this.postToDelete = post;
  }

  cancelPostDelete() {
    this.postToDelete = null;
  }

  deletePost() {
    this._postService.deletePost(this.postToDelete._id)
      .subscribe(() => {
        this.getPosts();
        this.cancelPostDeleteButton.nativeElement.click();
      });
  }

  setEditPost(post: Post) {
    this._commonService.setPostToEdit(post);
  }

  editPost() {
    this._postService.editPost(this.post, this.post._id)
      .subscribe(() => {
        this.closeEditPostButton.nativeElement.click();
        this._commonService.emitPostAdd();
        this._commonService.postToEdit = null;
      });
  }

  setUserToDelete(user: User) {
    this.userToDelete = user;
  }

  cancelUserDelete() {
    this.userToDelete = null;
  }

  deleteUser() {
    this._userService.deleteUser(this.userToDelete._id)
      .subscribe(() => {
        this.getUsers();
        this.cancelUserDeleteButton.nativeElement.click();
      });
  }

  setEditUser(user: User) {
    this._commonService.setUserToEdit(user);
  }

  editUser() {
    this._userService.editUser(this.user, this.user._id)
      .subscribe(() => {
        this.closeUserEditButton.nativeElement.click();
        this._commonService.emitUserAdd();
        this._commonService.userToEdit = null;
      });
  }
}
