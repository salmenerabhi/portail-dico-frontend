import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstpageRCComponent } from './firstpage-rc.component';

describe('FirstpageRCComponent', () => {
  let component: FirstpageRCComponent;
  let fixture: ComponentFixture<FirstpageRCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstpageRCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstpageRCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
