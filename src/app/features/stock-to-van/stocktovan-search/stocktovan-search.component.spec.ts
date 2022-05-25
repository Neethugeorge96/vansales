import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocktovanSearchComponent } from './stocktovan-search.component';

describe('StocktovanSearchComponent', () => {
  let component: StocktovanSearchComponent;
  let fixture: ComponentFixture<StocktovanSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocktovanSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocktovanSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
