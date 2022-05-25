import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonHeaderAreaComponent } from './common-header-area.component';

describe('CommonHeaderAreaComponent', () => {
  let component: CommonHeaderAreaComponent;
  let fixture: ComponentFixture<CommonHeaderAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonHeaderAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonHeaderAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
