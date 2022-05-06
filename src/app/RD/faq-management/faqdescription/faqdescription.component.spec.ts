import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqdescriptionComponent } from './faqdescription.component';

describe('FaqdescriptionComponent', () => {
  let component: FaqdescriptionComponent;
  let fixture: ComponentFixture<FaqdescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqdescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqdescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
