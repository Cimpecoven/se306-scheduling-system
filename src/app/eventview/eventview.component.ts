import { EventeditComponent } from './../eventedit/eventedit.component';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, AbstractControl, FormGroup } from '@angular/forms';
import { EventsService } from '../services/events.service';
import { Event } from '../models/Events';
import { MatDialog } from '@angular/material';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { EmployeeAccount, IAccount } from '../models/Accounts';
import { EmployeeRoles } from '../models/EmployeeRoles';

@Component({
  selector: 'app-eventview',
  templateUrl: './eventview.component.html',
  styleUrls: ['./eventview.component.scss']
})
export class EventviewComponent implements OnInit {
  public form: FormGroup;
  public events;
  // public canEdit: boolean;
  currentUser: any;
  event: Event = new Event("a","a","a","a","a",false,"a","a");

  constructor(private router: Router, private userService: UserService, private service: EventsService, private dialog: MatDialog,) { }
  
  ngOnInit() {
    this.service.getAllEvents().subscribe(res => (this.events = res));
    this.userService.currentUser.subscribe(user => {        
        this.currentUser = user;
    });

    if (!this.currentUser)
    {
      this.router.navigate(['/main']);
    }
  }

  populateForm(data, event){
    event.databaseKey = data.databaseKey.trim();
    event.date = data.date;
    event.startTime = data.startTime;
    event.endTime = data.endTime;
    event.room = data.room;
    event.catering = data.catering;
    event.menuItem = data.menuItem;
    event.description = data.description;   
  }

  openEditor(value){
    this.populateForm(value, this.event);

    if (this.currentUser.status == EmployeeRoles.BACManager || !this.currentUser.status)
      this.dialog.open(EventeditComponent, {data:{ Event: this.event }});
  }

}
