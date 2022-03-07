import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesRequestRCComponent } from './files-request-rc.component';

describe('FilesRequestRCComponent', () => {
  let component: FilesRequestRCComponent;
  let fixture: ComponentFixture<FilesRequestRCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesRequestRCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesRequestRCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
