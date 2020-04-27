import { environment } from './../../environments/environment.prod';
import { EventviewComponent } from './../eventview/eventview.component';
import { Component, OnInit, NgModule, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventsService } from '../services/events.service';
import { Event } from '../models/Events';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-eventedit',
  templateUrl: './eventedit.component.html',
  styleUrls: ['./eventedit.component.scss'],
  
})
export class EventeditComponent implements OnInit {
  private db: AngularFirestore
  public confirmFormControl = new FormControl('', [Validators.required]);
  public form: FormGroup
  datepipe = new DatePipe('en-US');

  constructor(private fb: FormBuilder, public service: EventsService, public dialogRef: MatDialogRef<EventeditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.fb.group({
      date: new FormControl('', [Validators.required]),
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required]),
      room: new FormControl('', [Validators.required]),
      catering: new FormControl(),
      menuItem: new FormControl(),
      description: new FormControl(),
    });
  }

  populateForm(data, event){
    // event.databaseKey = data.databaseKey;
    event.date = this.datepipe.transform(data.date, 'MM/dd/yyyy') as string;
    // this.date = this.datePipe.transform(new Date(), 'dd-MM-yy');
    event.startTime = data.startTime;
    event.endTime = data.endTime;

    if(data.room as string == "ball")
    {
      event.room = "Ballroom";
    }
    else if(data.room as string == "ballA")
    {
      event.room = "Ballroom A";
    }
    else if(data.room as string == "ballB")
    {
      event.room = "Ballroom B";
    }
    else if(data.room as string == "conventionCenter")
    {
      event.room = "Convention Center";
    }
    else if(data.room as string == "theater")
    {
      event.room = "Theater";
    }
    else if(data.room as string == "perfCenter")
    {
      event.room = "Performance Center";
    }

    if(data.catering as string == "yes")
    {
      event.catering = true;
    }
    else
    {
      event.catering = false;
    }

    if(data.menuItem as string == "Steak and Potatoes")
    {
      event.menuItem = "Steak and Potatoes";
    }
    else if(data.menuItem as string == "Chicken Alfredo Pasta")
    {
      event.menuItem = "Chicken Alfredo Pasta";
    }
    else if(data.menuItem as string == "Cheeseburger and Fries")
    {
      event.menuItem = "Cheeseburger and Fries";
    }
    else
    {
      event.menuItem = " ";
    }
    event.description = data.description ? data.description : " ";
    
  }

  tryEdit(value){
    // console.log('this is value in tryEdit', value);
    this.populateForm(value, this.data.Event);
    // console.log('Just before updateEvent', this.data.Event);
    //this.service.updateEventInfo(this.data.Event);
    this.service.updateEventInfo(new Event(this.data.Event.databaseKey,
                                           this.data.Event.date,
                                           this.data.Event.startTime,
                                           this.data.Event.endTime,
                                           this.data.Event.room,
                                           this.data.Event.catering,
                                           this.data.Event.menuItem,
                                           this.data.Event.description));
    this.dialogRef.close();
  }
  deleteEvent()
  {
    this.service.deleteEvent(this.data.Event.databaseKey);
    this.dialogRef.close();
  }

}
