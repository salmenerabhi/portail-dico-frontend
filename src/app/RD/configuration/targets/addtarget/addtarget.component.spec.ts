import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtargetComponent } from './addtarget.component';

describe('AddtargetComponent', () => {
  let component: AddtargetComponent;
  let fixture: ComponentFixture<AddtargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
