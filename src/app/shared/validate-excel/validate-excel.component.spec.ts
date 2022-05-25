import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateExcelComponent } from './validate-excel.component';

describe('ValidateExcelComponent', () => {
  let component: ValidateExcelComponent;
  let fixture: ComponentFixture<ValidateExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
