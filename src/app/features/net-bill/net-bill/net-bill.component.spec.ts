import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetBillComponent } from './net-bill.component';

describe('NetBillComponent', () => {
  let component: NetBillComponent;
  let fixture: ComponentFixture<NetBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
