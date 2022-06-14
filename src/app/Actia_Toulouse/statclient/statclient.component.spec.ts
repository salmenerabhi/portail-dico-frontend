import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatclientComponent } from './statclient.component';

describe('StatclientComponent', () => {
  let component: StatclientComponent;
  let fixture: ComponentFixture<StatclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
