import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCustomersComponent } from './components/list-customers/list-customers.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';

const routes: Routes = [
  { path: 'departments', component: ListCustomersComponent},
  { path: 'employees', component: ListEmployeesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents= [
  ListCustomersComponent,
  ListEmployeesComponent
]
