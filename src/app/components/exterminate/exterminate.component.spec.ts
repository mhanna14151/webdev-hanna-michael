import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExterminateComponent } from './exterminate.component';

describe('ExterminateComponent', () => {
  let component: ExterminateComponent;
  let fixture: ComponentFixture<ExterminateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExterminateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExterminateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
