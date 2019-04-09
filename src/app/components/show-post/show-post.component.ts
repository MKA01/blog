import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { CommonService } from '../../services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { PdfMaker } from '../../utils/PdfMaker';

@Component({
  selector : 'app-show-post',
  templateUrl : './show-post.component.html',
  styleUrls : [ './show-post.component.css' ]
})
export class ShowPostComponent implements OnInit {

  public posts: Post[] = [];
  private _searchBar: FormGroup;
  private _tagValue: string;

  constructor(private _postService: PostService, private _commonService: CommonService, private _formBuilder: FormBuilder,
              private _router: Router) {
    this._searchBar = _formBuilder.group({
      'tag' : [ '', Validators.required ]
    });

    interval(50000).subscribe(() => {
      this.refreshPosts();
    });

    this._tagValue = null;
  }

  ngOnInit() {
    this.getPosts();

    this._commonService.addPost$.subscribe(() => {
      this.getPosts();
    });

    this._searchBar.valueChanges
      .subscribe(() => {
        this.searchDuringTyping();
      });
  }

  searchByTag() {
    this._tagValue = this._searchBar.get('tag').value;
    this.getPosts();
  }

  resetTags() {
    this._tagValue = null;
    this._searchBar.reset();
    this.getPosts();
  }

  goToPost(post: Post) {
    this._router.navigate([ `app/post/${ post._id }` ]);
  }

  convertPostsToPdf() {
    new PdfMaker(this.posts).createPdfForPosts();
  }

  printPosts() {
    new PdfMaker(this.posts).printPosts();
  }

  private getPosts() {
    this.posts = [];
    this._postService.loadPosts()
      .subscribe((response: Post[]) => {
        if (this._tagValue !== null) {
          this.getPostsByTag(response);
        } else {
          this.posts = response;
        }
      });
  }

  private getPostsByTag(response: Post[]) {
    const lowerCaseTag = this._tagValue.toLowerCase();

    for (let i = 0; i < response.length; i++) {
      if (response[ i ].tags.length === 0 && response[ i ].tags[ 0 ] === lowerCaseTag) {
        this.posts.push(response[ i ]);
      } else {
        for (let j = 0; j < response[ i ].tags.length; j++) {
          if (response[ i ].tags[ j ] === lowerCaseTag) {
            this.posts.push(response[ i ]);
            break;
          }
        }
      }
    }
  }

  private searchDuringTyping() {
    this.searchByTag();
  }

  private refreshPosts() {
    console.log('Async refresh posts');
    this.getPosts();
  }
}
