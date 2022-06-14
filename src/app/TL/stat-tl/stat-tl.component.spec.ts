import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatTLComponent } from './stat-tl.component';

describe('StatTLComponent', () => {
  let component: StatTLComponent;
  let fixture: ComponentFixture<StatTLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatTLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatTLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
