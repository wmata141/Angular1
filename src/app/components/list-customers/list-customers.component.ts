import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { customerInterface } from "../../../models/customer.interface";
import { CustomerService } from '../../services/customer.service'
import { MatDialog, MatDialogConfig } from '@angular/material'
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'city', 'order', 'actions', 'new'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    console.log("ngOnInit")
    this.customerService.getAllCustumer().subscribe(res => {
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
    this.resetForm()
    this.openModal()
    if (element) {
      console.log("element", element)
      this.customerService.selected = element
    }
  }

  onDelete(id: string) {
    console.log("element", id)
    this.customerService.deleteCustomer(id)
  }

  openModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Modal'
    };
    dialogConfig.autoFocus = true;
    this.dialog.open(FormComponent, dialogConfig);
  }

  resetForm(): void {
    this.customerService.selected.id = null;
    this.customerService.selected.name = '';
    this.customerService.selected.city = '';
    this.customerService.selected.order = '';
  }

}
