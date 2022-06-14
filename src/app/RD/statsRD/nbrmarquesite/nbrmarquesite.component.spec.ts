import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbrmarquesiteComponent } from './nbrmarquesite.component';

describe('NbrmarquesiteComponent', () => {
  let component: NbrmarquesiteComponent;
  let fixture: ComponentFixture<NbrmarquesiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbrmarquesiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbrmarquesiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
