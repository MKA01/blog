import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { CommonService } from '../../services/common.service';

@Component({
  selector : 'app-show-post',
  templateUrl : './show-post.component.html',
  styleUrls : [ './show-post.component.css' ],
  providers : [ PostService ]
})
export class ShowPostComponent implements OnInit {

  @ViewChild('closeButton') closeButton: ElementRef;

  public posts: Post[];
  public postToDelete: Post;

  constructor(private _postService: PostService, private commonService: CommonService) {

  }

  ngOnInit() {
    this.getPosts();

    this.commonService.addPost$.subscribe(() => {
      this.getPosts();
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
   * Metoda nasłuchuje na odpowiedź z bazy i zapisuje pobrane posty do zmiennej
   */
  getPosts() {
    this._postService.loadPosts()
      .subscribe((response: Post[]) => {
        for (let i = 0; i < response.length; i++) {
          if (response[ i ].user === localStorage.getItem('loggedUser')) {
            this.posts.push(response[ i ]);
          }
        }
      });
  }

  /**
   * Metoda służy do edytowania postu
   * @param post - post do edycji
   */
  editPost(post: Post) {
    this.commonService.setPostToEdit(post);
  }

  /**
   * Metoda służy do usunięcia posta
   */
  deletePost() {
    this._postService.deletePost(this.postToDelete._id).subscribe(() => {
      this.getPosts();
      this.closeButton.nativeElement.click();
    });
  }

}
