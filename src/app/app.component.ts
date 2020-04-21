import { Component } from '@angular/core';
import { faCog, faBars, faCircle } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { UserService } from './services/user.service';
import { IAccount } from './models/Accounts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'scheduling-system';
  faCog = faCog;
  faBars = faBars;
  faCircle = faCircle;
  loggedIn = false;
  currentUser: IAccount;

  constructor(private dialog: MatDialog, private service: UserService) {
  }

  ngOnInit() {
    this.service.currentUser.subscribe(user => {
      
      if (user === null)
        this.loggedIn = false;
      else
        this.loggedIn = true;

      this.currentUser = user;
    })
  }

  openDialog() {

    // const dialogConfig = new MatDialogConfig();

    // dialogConfig.autoFocus = true;

    this.dialog.open(LoginComponent);
  }

}
