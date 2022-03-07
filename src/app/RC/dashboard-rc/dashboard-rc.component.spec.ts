import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRCComponent } from './dashboard-rc.component';

describe('DashboardRCComponent', () => {
  let component: DashboardRCComponent;
  let fixture: ComponentFixture<DashboardRCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardRCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
