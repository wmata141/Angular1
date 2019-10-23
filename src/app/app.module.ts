import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './material/mat.module';
// import { ListCustomersComponent } from './components/list-customers/list-customers.component';
import { CustomerService } from './services/customer.service';
import { environment } from '../environments/environment'
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    // ListCustomersComponent,
    ToolbarComponent,
    FormComponent,
    MainNavComponent,
    ListEmployeesComponent,
    SpinnerComponent,    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.configFirebase),
    MatModule,
    FormsModule,
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent],
  entryComponents: [FormComponent]
})
export class AppModule { }
