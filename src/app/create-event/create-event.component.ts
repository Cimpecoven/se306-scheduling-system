import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventsService } from '../services/events.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  public form: FormGroup;
  datepipe = new DatePipe('en-US');

  constructor(private fb: FormBuilder, private service: EventsService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      date: new FormControl('', [Validators.required]),
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      room: new FormControl('', [Validators.required]),
      catering: new FormControl('', [Validators.required]),
      menuItem: new FormControl(''),
    });
  }

  populateForm(data){
    // event.databaseKey = data.databaseKey;
    data.date = this.datepipe.transform(data.date, 'MM/dd/yyyy') as string;

    if(data.room as string == "ball")
    {
      data.room = "Ballroom";
    }
    else if(data.room as string == "ballA")
    {
      data.room = "Ballroom A";
    }
    else if(data.room as string == "ballB")
    {
      data.room = "Ballroom B";
    }
    else if(data.room as string == "conventionCenter")
    {
      data.room = "Convention Center";
    }
    else if(data.room as string == "theater")
    {
      data.room = "Theater";
    }
    else if(data.room as string == "perfCenter")
    {
      data.room = "Performance Center";
    }

    if(data.catering as string == "yes")
    {
      data.catering = true;
    }
    else
    {
      data.catering = false;
    }

    if(data.menuItem as string == "Steak and Potatoes")
    {
      data.menuItem = "Steak and Potatoes";
    }
    else if(data.menuItem as string == "Chicken Alfredo Pasta")
    {
      data.menuItem = "Chicken Alfredo Pasta";
    }
    else if(data.menuItem as string == "Cheeseburger and Fries")
    {
      data.menuItem = "Cheeseburger and Fries";
    }
    else
    {
      data.menuItem = " ";
    }

    data.description = data.description ? data.description : " ";   
  }

  tryRegister(value) {

    this.populateForm(value)
    this.service.createEvent(value);
    this.router.navigate(['/eventview']);
  }
}
