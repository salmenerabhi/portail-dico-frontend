import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationpageComponent } from './administrationpage.component';

describe('AdministrationpageComponent', () => {
  let component: AdministrationpageComponent;
  let fixture: ComponentFixture<AdministrationpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
