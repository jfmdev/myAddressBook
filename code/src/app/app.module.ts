import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';

import { BlockUIModule } from 'ng-block-ui';

import { AppComponent } from './app.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AppRoutingModule } from './app-routing.module';

import { DalService } from './services/dal.service';
import { ContactActions } from './actions/contact.actions';
import { ContactEffects } from './effects/contact.effects';
import { ContactListReducer } from './reducers/contact-list.reducer';
import { ContactReducer } from './reducers/contact.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailsComponent,
    ContactListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BlockUIModule,
    AppRoutingModule,
    StoreModule.forRoot({ 
      contact: ContactReducer, 
      contactList: ContactListReducer,
    }),
    EffectsModule.forRoot([
      ContactEffects,
    ])
  ],
  providers: [
    DalService,
    ContactActions
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }