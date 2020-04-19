import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateAccountDialogComponent } from '../account/create-account-dialog.component';

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
    const createDialogRef = this.createDialog.open(CreateAccountDialogComponent, {
      width: "400px",
      height: "600px"
    })
  }

}


