import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceNoComponent } from './invoice-no.component';

describe('InvoiceNoComponent', () => {
  let component: InvoiceNoComponent;
  let fixture: ComponentFixture<InvoiceNoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceNoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
