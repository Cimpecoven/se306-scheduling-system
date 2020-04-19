import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateAccountComponent } from '../create-account/create-account.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(public createDialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    
  }

}


