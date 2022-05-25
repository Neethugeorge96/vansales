import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateDropdownComponent } from './state-dropdown.component';

describe('StateDropdownComponent', () => {
  let component: StateDropdownComponent;
  let fixture: ComponentFixture<StateDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
