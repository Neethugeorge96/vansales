import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocktovanAddComponent } from './stocktovan-add.component';

describe('StocktovanAddComponent', () => {
  let component: StocktovanAddComponent;
  let fixture: ComponentFixture<StocktovanAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocktovanAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocktovanAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
