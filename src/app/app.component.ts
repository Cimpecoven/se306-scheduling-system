import { Component } from '@angular/core';
import { faCog, faBars } from '@fortawesome/free-solid-svg-icons';

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

  constructor() {
  }

  openNav() {
    this.isOpen = true;
  }
}
