import { Component, OnInit, NgModule, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
import { FoodService } from '../services/food.service';
import { FoodItem } from '../models/FoodSupplies';

@Component({
  selector: 'app-create-food-item',
  templateUrl: './create-food-item.component.html',
  styleUrls: ['./create-food-item.component.scss'],
  
})
export class CreateFoodItemComponent implements OnInit {
  public form: FormGroup
  datepipe = new DatePipe('en-US');

  constructor(private fb: FormBuilder, public service: FoodService, public dialogRef: MatDialogRef<CreateFoodItemComponent>) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      quantity: new FormControl(0, [Validators.required]),
      expirationDate: new FormControl('', [Validators.required]),
    });
  }

  tryRegister(value){
    this.service.createFoodItem(value);
    this.dialogRef.close();
  }

}
