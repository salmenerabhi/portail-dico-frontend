import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbrrejectedrcComponent } from './nbrrejectedrc.component';

describe('NbrrejectedrcComponent', () => {
  let component: NbrrejectedrcComponent;
  let fixture: ComponentFixture<NbrrejectedrcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbrrejectedrcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbrrejectedrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
