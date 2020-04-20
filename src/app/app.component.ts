import { Component } from '@angular/core';
import { faCog, faBars } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'scheduling-system';
  faCog = faCog;
  faBars = faBars;
  isOpen = false;

  constructor(private dialog: MatDialog) {
  }

  openDialog() {

    // const dialogConfig = new MatDialogConfig();

    // dialogConfig.autoFocus = true;

    this.dialog.open(LoginComponent);
  }

}
