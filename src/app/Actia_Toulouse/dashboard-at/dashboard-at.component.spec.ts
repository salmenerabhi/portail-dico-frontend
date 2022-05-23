import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardATComponent } from './dashboard-at.component';

describe('DashboardATComponent', () => {
  let component: DashboardATComponent;
  let fixture: ComponentFixture<DashboardATComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardATComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardATComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
