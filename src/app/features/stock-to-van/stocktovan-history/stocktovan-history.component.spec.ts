import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocktovanHistoryComponent } from './stocktovan-history.component';

describe('StocktovanHistoryComponent', () => {
  let component: StocktovanHistoryComponent;
  let fixture: ComponentFixture<StocktovanHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocktovanHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocktovanHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
