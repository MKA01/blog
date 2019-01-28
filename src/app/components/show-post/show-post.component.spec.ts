import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPostComponent } from './show-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from '../../services/common.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ShowPostComponent', () => {
  let component: ShowPostComponent;
  let fixture: ComponentFixture<ShowPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations : [
        ShowPostComponent
      ],
      providers : [
        PostService,
        CommonService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
