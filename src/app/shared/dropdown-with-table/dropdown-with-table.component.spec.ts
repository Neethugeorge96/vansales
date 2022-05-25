import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownWithTableComponent } from './dropdown-with-table.component';

describe('DropdownWithTableComponent', () => {
  let component: DropdownWithTableComponent;
  let fixture: ComponentFixture<DropdownWithTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownWithTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownWithTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
