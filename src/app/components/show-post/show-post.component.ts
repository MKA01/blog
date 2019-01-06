import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  public posts: any [];
  public postToDelete;

  constructor(private _postService: PostService, private commonService: CommonService) {

  }

  ngOnInit() {
    this.getPosts();

    this.commonService.addPost$.subscribe(res => {
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
   * Metoda służy do pobrania wszystkich postów z bazy. Wywoływana jest podczas inicjalizacji komponentu i po dodaniu posta
   */
  getPosts() {
    this._postService.getPosts().subscribe(result => {
      console.log('result is ', result);
      this.posts = result[ 'data' ];
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
    this._postService.deletePost(this.postToDelete._id).subscribe(res => {
      this.getPosts();
      this.closeButton.nativeElement.click();
    });
  }

}
