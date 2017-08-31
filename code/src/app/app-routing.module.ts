import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactListComponent } from './contact-list/contact-list.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ContactListComponent },
  { path: 'edit', component: ContactDetailsComponent },
  { path: 'edit/:id', component: ContactDetailsComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}