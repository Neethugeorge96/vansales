import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VanmasterListComponent } from './vanmaster-list.component';

describe('VanmasterListComponent', () => {
  let component: VanmasterListComponent;
  let fixture: ComponentFixture<VanmasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VanmasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VanmasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
