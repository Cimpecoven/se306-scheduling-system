import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatNativeDateModule, MatDatepickerModule, MAT_DATE_LOCALE } from '@angular/material';
import { EventsService } from '../services/events.service';

@NgModule({
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MatDatepickerModule, 
    MatNativeDateModule 
],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
})


@Component({
  selector: 'app-eventedit',
  templateUrl: './eventedit.component.html',
  styleUrls: ['./eventedit.component.scss']
})
export class EventeditComponent implements OnInit {
  public form: FormGroup;

  public confirmFormControl = new FormControl('', [Validators.required]);
  constructor(private fb: FormBuilder, private service: EventsService,  private dialogRef: MatDialogRef<EventeditComponent>) { }

  ngOnInit() {
    this.form = this.fb.group({
      date: new FormControl('', [Validators.required]),
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required]),
      room: new FormControl('', [Validators.required]),
      
    });
  }

  tryEdit(value){
    
  }

}
