import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFilesTLComponent } from './list-files-tl.component';

describe('ListFilesTLComponent', () => {
  let component: ListFilesTLComponent;
  let fixture: ComponentFixture<ListFilesTLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFilesTLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFilesTLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
