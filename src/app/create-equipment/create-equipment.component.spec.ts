import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEquipmentComponent } from './create-equipment.component';

describe('EventeditComponent', () => {
  let component: CreateEquipmentComponent;
  let fixture: ComponentFixture<CreateEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
