import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
    @Inject(MAT_DIALOG_DATA) public data
  ) { 
    this.contactForm = this.createFormGroup();
  }

  ngOnInit() { }

  createFormGroup() {
    if (this.data.element) {
      return new FormGroup({
        name: new FormControl(this.data.element.name, [Validators.required, Validators.minLength(2)]),
        city: new FormControl(this.data.element.city, [Validators.required, Validators.minLength(2)]),
        order: new FormControl(this.data.element.order, [Validators.required, Validators.minLength(2)]),
      })
    } else {
      return new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(2)]),
        city: new FormControl('', [Validators.required, Validators.minLength(2)]),
        order: new FormControl('', [Validators.required, Validators.minLength(2)]),
      })
    }
    
  }

  close(): void {
    this.dialogRef.close();
  }

  onResetForm() {
    this.contactForm.reset()
  }

  onSaveForm() {    
    const newCustomer = this.contactForm.value;
    
    if (!this.data.element) {
      if (this.contactForm.valid) {
        this.customer.addCustomer(newCustomer)
        this.onResetForm();
      }      
    } else {
      this.customer.editCustomer(newCustomer, this.data.element.id)
    }
    this.close();
  }

  get name() { return this.contactForm.get('name'); }
  get city() { return this.contactForm.get('city'); }
  get order() { return this.contactForm.get('order'); }

}
