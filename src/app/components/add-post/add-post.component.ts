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
  @ViewChild('editPostButton') editPostButton: ElementRef;

  public post: Post = <Post>{};

  constructor(private _postService: PostService,
              private _commonService: CommonService) {
    this._commonService.editPost$.subscribe(() => {
      this.editPostButton.nativeElement.click();
    });
  }

  ngOnInit() {
    this._commonService.editPost$.subscribe(() => {
      this.post = this._commonService.postToEdit;
    });
  }

  /**
   * Metoda służy do dodania posta z danych wprowadzonych w formularzu
   */
  addPost() {
    this._postService.addPost(this.post)
      .subscribe(() => {
        this.closeButton.nativeElement.click();
        this._commonService.emitPostAdd();
      });
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
