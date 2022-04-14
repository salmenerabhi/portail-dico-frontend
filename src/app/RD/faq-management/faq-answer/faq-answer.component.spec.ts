import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqAnswerComponent } from './faq-answer.component';

describe('FaqAnswerComponent', () => {
  let component: FaqAnswerComponent;
  let fixture: ComponentFixture<FaqAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
