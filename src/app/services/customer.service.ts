import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { customerInterface } from "../../models/customer.interface";

export interface idCustomer extends customerInterface { id: string; }

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerCollection: AngularFirestoreCollection<customerInterface>;
  customers: Observable<idCustomer[]>;

  constructor(
    private readonly afs: AngularFirestore
  ) { 
    this.customerCollection = afs.collection<customerInterface>('customers');
    this.customers = this.customerCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.doc.data() as customerInterface;
        const id = a.payload.doc.id;
        return { id, ...data};
      }))
    );
  }

  getAllCustumer() {
    return this.customers;
  }

  addCustomer(customer: customerInterface) {
    return this.customerCollection.add(customer);
  }

  editCustomer(customer: customerInterface, id) {    
    return this.customerCollection.doc(id).update(customer)
  }

  deleteCustomer(id: string) {
    return this.customerCollection.doc(id).delete();
  }
}
