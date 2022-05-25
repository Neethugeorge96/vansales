import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteAddEditViewComponent } from './route-add-edit-view.component';

describe('RouteAddEditViewComponent', () => {
  let component: RouteAddEditViewComponent;
  let fixture: ComponentFixture<RouteAddEditViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteAddEditViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteAddEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
