import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqchildComponent } from './faqchild.component';

describe('FaqchildComponent', () => {
  let component: FaqchildComponent;
  let fixture: ComponentFixture<FaqchildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqchildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqchildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
