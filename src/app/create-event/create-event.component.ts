import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  constructor(service: EventService) { }

  ngOnInit() {
  }

  tryRegister(value) {
  }

}
