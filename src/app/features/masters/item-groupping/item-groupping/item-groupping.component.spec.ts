import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGrouppingComponent } from './item-groupping.component';

describe('ItemGrouppingComponent', () => {
  let component: ItemGrouppingComponent;
  let fixture: ComponentFixture<ItemGrouppingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemGrouppingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGrouppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
