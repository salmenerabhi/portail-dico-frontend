import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardingComponent } from './dashboarding.component';

describe('DashboardingComponent', () => {
  let component: DashboardingComponent;
  let fixture: ComponentFixture<DashboardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
