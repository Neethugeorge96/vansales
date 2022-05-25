import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDiscountComponent } from './customer-discount.component';

describe('CustomerDiscountComponent', () => {
  let component: CustomerDiscountComponent;
  let fixture: ComponentFixture<CustomerDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
