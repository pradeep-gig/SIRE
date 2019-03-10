import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostViewPage } from './post-view.page';

describe('PostViewPage', () => {
  let component: PostViewPage;
  let fixture: ComponentFixture<PostViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
