import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingrequestComponent } from './loadingrequest.component';

describe('LoadingrequestComponent', () => {
  let component: LoadingrequestComponent;
  let fixture: ComponentFixture<LoadingrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
