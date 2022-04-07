import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsRCComponent } from './tools-rc.component';

describe('ToolsRCComponent', () => {
  let component: ToolsRCComponent;
  let fixture: ComponentFixture<ToolsRCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsRCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsRCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
