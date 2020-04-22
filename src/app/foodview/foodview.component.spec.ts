import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodviewComponent } from './foodview.component';

describe('FoodviewComponent', () => {
  let component: FoodviewComponent;
  let fixture: ComponentFixture<FoodviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
