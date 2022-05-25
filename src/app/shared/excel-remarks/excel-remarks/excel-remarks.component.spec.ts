import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelRemarksComponent } from './excel-remarks.component';

describe('ExcelRemarksComponent', () => {
  let component: ExcelRemarksComponent;
  let fixture: ComponentFixture<ExcelRemarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelRemarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
