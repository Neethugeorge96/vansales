import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarksFromExcelComponent } from './remarks-from-excel.component';

describe('RemarksFromExcelComponent', () => {
  let component: RemarksFromExcelComponent;
  let fixture: ComponentFixture<RemarksFromExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemarksFromExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemarksFromExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
