import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcastEntryListComponent } from './forcast-entry-list.component';

describe('ForcastEntryListComponent', () => {
  let component: ForcastEntryListComponent;
  let fixture: ComponentFixture<ForcastEntryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForcastEntryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForcastEntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
