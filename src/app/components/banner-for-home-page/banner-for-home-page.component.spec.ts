import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerForHomePageComponent } from './banner-for-home-page.component';

describe('BannerForHomePageComponent', () => {
  let component: BannerForHomePageComponent;
  let fixture: ComponentFixture<BannerForHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerForHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerForHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
