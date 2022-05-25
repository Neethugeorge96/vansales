import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMappingComponent } from './item-mapping.component';

describe('ItemMappingComponent', () => {
  let component: ItemMappingComponent;
  let fixture: ComponentFixture<ItemMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
