import { TestBed } from '@angular/core/testing';

import { ShowPostService } from './show-post/show-post.service';

describe('ShowPostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowPostService = TestBed.get(ShowPostService);
    expect(service).toBeTruthy();
  });
});
