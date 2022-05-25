import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastEntryComponent } from './forecast-entry.component';

describe('ForecastEntryComponent', () => {
  let component: ForecastEntryComponent;
  let fixture: ComponentFixture<ForecastEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
