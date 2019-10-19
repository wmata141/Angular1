import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { customerInterface } from "../../../models/customer.interface";
import { CustomerService } from '../../services/customer.service'

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'city', 'order', 'actions'];
  dataSource = new MatTableDataSource();
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private customerService: CustomerService,
  ) { }

  ngOnInit() {
    this.customerService.getAllCustumer().subscribe( res => {      
      this.dataSource.data = res
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(element) {
    if (element) {
      console.log("element",element)
      this.customerService.selected = element
    }    
  }

  onDelete(id: string) {
    console.log("element",id)
    this.customerService.deleteCustomer(id)
  }
}
