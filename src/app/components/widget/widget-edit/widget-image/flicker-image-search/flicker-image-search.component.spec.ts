import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlickerImageSearchComponent } from './flicker-image-search.component';

describe('FlickerImageSearchComponent', () => {
  let component: FlickerImageSearchComponent;
  let fixture: ComponentFixture<FlickerImageSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlickerImageSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlickerImageSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
