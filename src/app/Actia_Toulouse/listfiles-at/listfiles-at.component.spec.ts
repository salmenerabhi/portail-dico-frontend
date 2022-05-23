import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListfilesATComponent } from './listfiles-at.component';

describe('ListfilesATComponent', () => {
  let component: ListfilesATComponent;
  let fixture: ComponentFixture<ListfilesATComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListfilesATComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListfilesATComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
