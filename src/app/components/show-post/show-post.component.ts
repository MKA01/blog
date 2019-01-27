import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { CommonService } from '../../services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector : 'app-show-post',
  templateUrl : './show-post.component.html',
  styleUrls : [ './show-post.component.css' ]
})
export class ShowPostComponent implements OnInit {

  public posts: Post[] = [];
  private _searchBar: FormGroup;

  constructor(private _postService: PostService,
              private _commonService: CommonService,
              private _formBuilder: FormBuilder) {
    this._searchBar = _formBuilder.group({
      'tag' : [ '', Validators.required ]
    });
  }

  ngOnInit() {
    this.getPosts(null);

    this._commonService.addPost$.subscribe(() => {
      this.getPosts(null);
    });
  }

  /**
   * Metoda nasłuchuje na odpowiedź z bazy i zapisuje pobrane posty do zmiennej
   */
  getPosts(tag: string) {
    this.posts = [];
    this._postService.loadPosts()
      .subscribe((response: Post[]) => {
        if (tag === null) {
          this.posts = response;
        } else {
          for (let i = 0; i < response.length; i++) {
            for (let j = 0; j < response[ i ].tags.length; j++) {
              if (response[ i ].tags[ j ] === tag) {
                this.posts.push(response[ i ]);
                break;
              }
            }
          }
        }
      });
  }

  searchByTag() {
    this.getPosts(this._searchBar.get('tag').value);
  }

  resetTags() {
    this.getPosts(null);
    this._searchBar.reset();
  }
}
