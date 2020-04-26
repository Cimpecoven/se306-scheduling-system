import { Component, OnInit, NgModule, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
import { EquipmentService } from '../services/equipment.service';

@Component({
  selector: 'app-create-equipment',
  templateUrl: './create-equipment.component.html',
  styleUrls: ['./create-equipment.component.scss'],
  
})
export class CreateEquipmentComponent implements OnInit {
  public form: FormGroup
  datepipe = new DatePipe('en-US');

  constructor(private fb: FormBuilder, public service: EquipmentService, public dialogRef: MatDialogRef<CreateEquipmentComponent>) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      quantity: new FormControl(0, [Validators.required]),
      location: new FormControl('', [Validators.required]),
      condition: new FormControl('', [Validators.required]),
    });
  }

  tryRegister(value){
    this.service.createEquipmentItem(value);
    this.dialogRef.close();
  }

}
