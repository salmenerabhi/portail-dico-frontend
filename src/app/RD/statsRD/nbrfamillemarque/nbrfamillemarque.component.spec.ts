import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbrfamillemarqueComponent } from './nbrfamillemarque.component';

describe('NbrfamillemarqueComponent', () => {
  let component: NbrfamillemarqueComponent;
  let fixture: ComponentFixture<NbrfamillemarqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbrfamillemarqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbrfamillemarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
