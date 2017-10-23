import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerForWebDevAssignmentComponent } from './banner-for-web-dev-assignment.component';

describe('BannerForWebDevAssignmentComponent', () => {
  let component: BannerForWebDevAssignmentComponent;
  let fixture: ComponentFixture<BannerForWebDevAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerForWebDevAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerForWebDevAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
