import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTLComponent } from './dashboard-tl.component';

describe('DashboardTLComponent', () => {
  let component: DashboardTLComponent;
  let fixture: ComponentFixture<DashboardTLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
