import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodService } from '../services/food.service';
import { FoodItem } from '../models/FoodSupplies';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-foodview',
  templateUrl: './foodview.component.html',
  styleUrls: ['./foodview.component.scss']
})
export class FoodviewComponent implements OnInit {

  displayedColumns: string[] = ['name', 'quantity', 'expirationDate', 'databaseKey'];
  public dataSource = new MatTableDataSource<FoodItem>();

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: FoodService) { }

  ngOnInit() {
    this.service.getAllFoodItems().pipe(
      map(items => items.map(i => ({...i.payload.doc.data() })))
    ).subscribe(items => {
      this.dataSource.data = items as FoodItem[];
      console.log(this.dataSource.data);
      // this.dataSource.paginator = this.paginator;
    });
  }

  itemSelected(row) {
    //navigate to item details page
  }
}
