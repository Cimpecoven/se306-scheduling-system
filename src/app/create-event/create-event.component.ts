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

  public form: FormGroup;

  constructor(private fb: FormBuilder, service: EventService) { }

  ngOnInit() {
    this.form = this.fb.group({
      date: new FormControl('', [Validators.required]),
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      room: new FormControl('', [Validators.required]),
      catering: new FormControl('', [Validators.required]),
      menu: new FormControl(''),
    });
  }

  tryRegister(value) {
  }
}
