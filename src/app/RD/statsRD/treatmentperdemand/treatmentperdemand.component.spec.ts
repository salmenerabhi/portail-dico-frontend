import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentperdemandComponent } from './treatmentperdemand.component';

describe('TreatmentperdemandComponent', () => {
  let component: TreatmentperdemandComponent;
  let fixture: ComponentFixture<TreatmentperdemandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentperdemandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentperdemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
