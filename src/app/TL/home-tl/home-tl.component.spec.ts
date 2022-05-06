import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTLComponent } from './home-tl.component';

describe('HomeTLComponent', () => {
  let component: HomeTLComponent;
  let fixture: ComponentFixture<HomeTLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
