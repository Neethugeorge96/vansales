import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedqtyInvoicehistoryComponent } from './suggestedqty-invoicehistory.component';

describe('SuggestedqtyInvoicehistoryComponent', () => {
  let component: SuggestedqtyInvoicehistoryComponent;
  let fixture: ComponentFixture<SuggestedqtyInvoicehistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestedqtyInvoicehistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedqtyInvoicehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
