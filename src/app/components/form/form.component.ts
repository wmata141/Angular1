import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(
    public customer: CustomerService
  ) { }

  ngOnInit() {
  }

  onSave() {
    console.log("onSave")
    if (this.customer.selected.id == null) {
      let newCustomer = {
        name: this.customer.selected.name,
        city: this.customer.selected.city,
        order: this.customer.selected.order,
      }
      console.log("newCustomer",newCustomer)
      this.customer.addCustomer(newCustomer)
    } else {
      this.customer.editCustomer(this.customer.selected)
    }    
  }
  
}
