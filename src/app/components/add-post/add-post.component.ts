import { Component } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector : 'app-add-post',
  templateUrl : './add-post.component.html',
  styleUrls : [ './add-post.component.css' ],
  providers : [ PostService ]
})
export class AddPostComponent {

  public post: Post = <Post>{};

  constructor(private _postService: PostService,
              private _commonService: CommonService) {
  }

  /**
   * Metoda służy do dodania posta z danych wprowadzonych w formularzu
   */
  addPost() {
    this._postService.addPost(this.post)
      .subscribe(() => {
        this._commonService.emitPostAdd();
      });
  }

}
