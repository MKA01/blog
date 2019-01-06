import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
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
  public post: Post;

  constructor(private _postService: PostService, private commonService: CommonService) {
    this.post = new Post();
  }

  ngOnInit() {
    this.commonService.editPost$.subscribe(res => {
      this.post = this.commonService.postToEdit;
    });
  }

  /**
   * Metoda służy do przygotowania posta z danych wprowadzonych w formularzu
   */
  addPost() {
    if (this.post.title && this.post.description) {
      if (this.post._id) {
        this._postService.updatePost(this.post).subscribe(res => {
          this.closeButton.nativeElement.click();
          this.commonService.emitPostAdd();
        });
      } else {
        this._postService.addPost(this.post).subscribe(res => {
          this.closeButton.nativeElement.click();
          this.commonService.emitPostAdd();
        });
      }
    } else {
      alert('Tytuł i opis są wymagane');
    }
  }

}
