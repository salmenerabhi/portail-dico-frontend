import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingapproximationComponent } from './loadingapproximation.component';

describe('LoadingapproximationComponent', () => {
  let component: LoadingapproximationComponent;
  let fixture: ComponentFixture<LoadingapproximationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingapproximationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingapproximationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
