import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { CommonService } from '../../services/common.service';

@Component({
  selector : 'app-show-post',
  templateUrl : './show-post.component.html',
  styleUrls : [ './show-post.component.css' ]
})
export class ShowPostComponent implements OnInit {

  public posts: Post[] = [];

  constructor(private _postService: PostService, private _commonService: CommonService) {
  }

  ngOnInit() {
    this.getPosts();

    this._commonService.addPost$.subscribe(() => {
      this.getPosts();
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
}
