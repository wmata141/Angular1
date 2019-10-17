import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { customerInterface } from '../../../models/customer.interface';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'city', 'order'];
  dataSource = new MatTableDataSource();

  constructor() { }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
