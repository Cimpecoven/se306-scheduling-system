import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { EmployeeRoles } from '../models/EmployeeRoles';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Equipment } from '../models/Equipment';
import { EquipmentService } from '../services/equipment.service';
import { CreateEquipmentComponent } from '../create-equipment/create-equipment.component';
import { EquipmenteditComponent } from '../equipmentedit/equipmentedit.component';

@Component({
  selector: 'app-equipmentview',
  templateUrl: './equipmentview.component.html',
  styleUrls: ['./equipmentview.component.scss']
})
export class EquipmentviewComponent implements OnInit {

  public items;
  public item = new Equipment();
  public currentUser: any;
  public faTrashAlt = faTrashAlt;

  constructor(private service: EquipmentService, private userService: UserService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.service.getAllEquipmentItems().subscribe(data => {this.items = data});
    
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
    item.location = data.location;
    item.condition = data.condition;    
  }

  openEditor(value){
    this.populateForm(value, this.item);
    
    if (this.currentUser.status == EmployeeRoles.BACManager || 
        this.currentUser.status == EmployeeRoles.TechnicalManager || 
        this.currentUser.status == EmployeeRoles.Technician ||
        this.currentUser.status == EmployeeRoles.Host)
              this.dialog.open(EquipmenteditComponent, {data:{ item: this.item }});
  }

  openDialog() {
    this.dialog.open(CreateEquipmentComponent);
  }

  deleteItem(value) {
    this.service.deleteEquipmentItem(value);
  }
}
