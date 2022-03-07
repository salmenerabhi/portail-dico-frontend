import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqConfigurationComponent } from './faq-configuration.component';

describe('FaqConfigurationComponent', () => {
  let component: FaqConfigurationComponent;
  let fixture: ComponentFixture<FaqConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
