import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector : 'app-add-post',
  templateUrl : './add-post.component.html',
  styleUrls : [ './add-post.component.css' ],
  providers : [ PostService ]
})
export class AddPostComponent implements OnInit {

  @ViewChild('closeButton') closeButton: ElementRef;
  public post: Post = <Post>{};

  constructor(private _postService: PostService,
              private commonService: CommonService) {
  }

  ngOnInit() {
    this.commonService.editPost$.subscribe(() => {
      this.post = this.commonService.postToEdit;
    });
  }

  /**
   * Metoda służy do przygotowania posta z danych wprowadzonych w formularzu
   */
  addPost() {
    if (this.post._id) {
      this._postService.editPost(this.post, this.post._id)
        .subscribe(() => {
          this.closeButton.nativeElement.click();
          this.commonService.emitPostAdd();
          this.commonService.postToEdit = null;
        });
    } else {
      this._postService.addPost(this.post)
        .subscribe(() => {
          this.closeButton.nativeElement.click();
          this.commonService.emitPostAdd();
        });
    }
  }

}
