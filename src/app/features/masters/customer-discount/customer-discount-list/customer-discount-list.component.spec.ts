import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDiscountListComponent } from './customer-discount-list.component';

describe('CustomerDiscountListComponent', () => {
  let component: CustomerDiscountListComponent;
  let fixture: ComponentFixture<CustomerDiscountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDiscountListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDiscountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
