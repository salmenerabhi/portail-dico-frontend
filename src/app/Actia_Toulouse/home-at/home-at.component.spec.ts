import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeATComponent } from './home-at.component';

describe('HomeATComponent', () => {
  let component: HomeATComponent;
  let fixture: ComponentFixture<HomeATComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeATComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeATComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
