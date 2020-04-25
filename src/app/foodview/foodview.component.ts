import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodService } from '../services/food.service';
import { FoodItem } from '../models/FoodSupplies';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { FoodeditComponent } from '../foodedit/foodedit.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { EmployeeRoles } from '../models/EmployeeRoles';
import { CreateFoodItemComponent } from '../create-food-item/create-food-item.component';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-foodview',
  templateUrl: './foodview.component.html',
  styleUrls: ['./foodview.component.scss']
})
export class FoodviewComponent implements OnInit {

  public items;
  public item = new FoodItem();
  public currentUser: any;
  public faTrashAlt = faTrashAlt;

  constructor(private service: FoodService, private userService: UserService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.service.getAllFoodItems().subscribe(data => {this.items = data});
    
    this.userService.currentUser.subscribe(user => {        
      this.currentUser = user;
  });

  if (!this.currentUser || !this.currentUser.status)
  {
    this.router.navigate(['/main']);
  }

  }

  populateForm(data, item){
    item.databaseKey = data.databaseKey.trim();
    item.quantity = data.quantity;
    item.name = data.name;
    item.expirationDate = data.expirationDate;    
  }

  openEditor(value){
    this.populateForm(value, this.item);
    
    if (this.currentUser.status == EmployeeRoles.BACManager || 
        this.currentUser.status == EmployeeRoles.KitchenManager || 
        this.currentUser.status == EmployeeRoles.Cook ||
        this.currentUser.status == EmployeeRoles.Host ||
        this.currentUser.status == EmployeeRoles.Server) {
      this.dialog.open(FoodeditComponent, {data:{ item: this.item }});
    }
  }

  openDialog() {
    this.dialog.open(CreateFoodItemComponent);
  }
}
