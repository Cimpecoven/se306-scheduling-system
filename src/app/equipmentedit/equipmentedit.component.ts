import { Component, OnInit, NgModule, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
import { EquipmentService } from '../services/equipment.service';
import { Equipment } from '../models/Equipment';

@Component({
  selector: 'app-equipmentedit',
  templateUrl: './equipmentedit.component.html',
  styleUrls: ['./equipmentedit.component.scss'],
  
})
export class EquipmenteditComponent implements OnInit {
  public form: FormGroup
  datepipe = new DatePipe('en-US');

  constructor(private fb: FormBuilder, public service: EquipmentService, public dialogRef: MatDialogRef<EquipmenteditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: new FormControl(''),
      quantity: new FormControl(0),
      location: new FormControl(''),
      condition: new FormControl(''),
    });
  }

  populateForm(data, item){
    item.name = data.name;
    item.location = data.location;
    item.condition = data.condtion;
    item.quantity = data.quantity;
  }

  tryEdit(value){
    this.populateForm(value, this.data.item);
    this.service.updateEquipmentItem(this.data.item as Equipment);
    this.dialogRef.close();
  }

}
