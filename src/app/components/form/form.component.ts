import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
import { CustomerService } from '../../services/customer.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  contactForm: FormGroup;
  constructor(
    public customer: CustomerService,
    public dialogRef: MatDialogRef<FormComponent>,    
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    this.contactForm = this.createFormGroup();
  }

  ngOnInit() { }

  createFormGroup() {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      city: new FormControl('', [Validators.required, Validators.minLength(2)]),
      order: new FormControl('', [Validators.required, Validators.minLength(2)]),
    })
  }

  onSave() {
    console.log("onSave")
    if (this.customer.selected.id == null) {
      let newCustomer = {
        name: this.customer.selected.name,
        city: this.customer.selected.city,
        order: this.customer.selected.order,
      }
      console.log("newCustomer", newCustomer)
      this.customer.addCustomer(newCustomer)
    } else {
      this.customer.editCustomer(this.customer.selected)
    }
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  onResetForm() {
    this.contactForm.reset()
  }

  onSaveForm() {    
    console.log("onSaveForm",this.contactForm.value)
    const newCustomer = this.contactForm.value;
    if (this.customer.selected.id == null) {
      if (this.contactForm.valid) {
        this.customer.addCustomer(newCustomer)
        this.onResetForm();
      }      
    } else {
      this.customer.editCustomer(this.customer.selected)
    }
    this.close();
  }

  get name() { return this.contactForm.get('name'); }
  get city() { return this.contactForm.get('city'); }
  get order() { return this.contactForm.get('order'); }

}
