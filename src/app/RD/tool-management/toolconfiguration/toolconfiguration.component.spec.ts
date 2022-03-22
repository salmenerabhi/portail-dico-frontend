import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolconfigurationComponent } from './toolconfiguration.component';

describe('ToolconfigurationComponent', () => {
  let component: ToolconfigurationComponent;
  let fixture: ComponentFixture<ToolconfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolconfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
