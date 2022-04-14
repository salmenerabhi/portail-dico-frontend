import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqAddAnswerComponent } from './faq-add-answer.component';

describe('FaqAddAnswerComponent', () => {
  let component: FaqAddAnswerComponent;
  let fixture: ComponentFixture<FaqAddAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqAddAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqAddAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
