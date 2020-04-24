import { Component, OnInit, NgModule, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
import { FoodService } from '../services/food.service';
import { FoodItem } from '../models/FoodSupplies';

@Component({
  selector: 'app-foodedit',
  templateUrl: './foodedit.component.html',
  styleUrls: ['./foodedit.component.scss'],
  
})
export class FoodeditComponent implements OnInit {
  public form: FormGroup
  datepipe = new DatePipe('en-US');

  constructor(private fb: FormBuilder, public service: FoodService, public dialogRef: MatDialogRef<FoodeditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      quantity: new FormControl(0, [Validators.required]),
      expirationDate: new FormControl('', [Validators.required]),
    });
  }

  populateForm(data, item){
    item.name = data.name;
    item.expirationDate = this.datepipe.transform(data.expirationDate, 'MM/dd/yyyy') as string;
    item.quantity = data.quantity.toString();
  }

  tryEdit(value){
    this.populateForm(value, this.data.item);
    this.service.updateFoodItem(this.data.item as FoodItem);
    this.dialogRef.close();
  }

}
