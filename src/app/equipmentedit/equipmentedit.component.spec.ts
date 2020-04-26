import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmenteditComponent } from './equipmentedit.component';

describe('EventeditComponent', () => {
  let component: EquipmenteditComponent;
  let fixture: ComponentFixture<EquipmenteditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmenteditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmenteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
