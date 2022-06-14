import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherstatsComponent } from './otherstats.component';

describe('OtherstatsComponent', () => {
  let component: OtherstatsComponent;
  let fixture: ComponentFixture<OtherstatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherstatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
