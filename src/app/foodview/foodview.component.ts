import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodService } from '../services/food.service';
import { FoodItem } from '../models/FoodSupplies';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { FoodeditComponent } from '../foodedit/foodedit.component';

@Component({
  selector: 'app-foodview',
  templateUrl: './foodview.component.html',
  styleUrls: ['./foodview.component.scss']
})
export class FoodviewComponent implements OnInit {

  // displayedColumns: string[] = ['name', 'quantity', 'expirationDate', 'databaseKey'];
  // public dataSource = new MatTableDataSource<FoodItem>();

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  public items;
  public item = new FoodItem();

  constructor(private service: FoodService, private dialog: MatDialog) { }

  ngOnInit() {
    this.service.getAllFoodItems().subscribe(data => {this.items = data});
    
    // .pipe(
    //   map(items => items.map(i => ({...i.payload.doc.data() })))
    // ).subscribe(items => {
    //   this.dataSource.data = items as FoodItem[];
    //   // console.log(this.dataSource.data);
    //   // this.dataSource.paginator = this.paginator;
    // });
  }

  populateForm(data, item){
    item.databaseKey = data.databaseKey.trim();
    item.quantity = data.quantity;
    item.name = data.name;
    item.expirationDate = data.expirationDate;    
  }

  openEditor(value){
    this.populateForm(value, this.item);
    this.dialog.open(FoodeditComponent, {data:{ item: this.item }});
  }
}
