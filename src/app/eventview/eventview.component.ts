import { EventeditComponent } from './../eventedit/eventedit.component';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, AbstractControl, FormGroup } from '@angular/forms';
import { EventsService } from '../services/events.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-eventview',
  templateUrl: './eventview.component.html',
  styleUrls: ['./eventview.component.scss']
})
export class EventviewComponent implements OnInit {
  public form: FormGroup;
  public events;

  constructor(private fb: FormBuilder, private service: EventsService, private dialog: MatDialog,) { }

  ngOnInit() {
    this.service.getAllEvents();

  }

  populateForm(data, form){
    data.date = form.date;
    data.startTime = form.startTime;
    data.endTime = form.endTime;
    data.room = form.room;
    data.catering = form.catering;
    data.menuItem = form.menuItem;
    data.description = form.description;
    console.log(data);
  }

  getEvents(){
  this.service
  .getAllEvents()
  .subscribe(res => (this.events = res));
  }

  openEditor(){
    console.log("Made it to openEditor BEFORE dialog");
    this.dialog.open(EventeditComponent);
    console.log("Made it to openEditor AFTER dialog");
  }

}
