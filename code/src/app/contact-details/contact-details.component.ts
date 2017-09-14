import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap'

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { Contact } from '../models/contact';
import { ContactActions } from '../actions/contact.actions';
import { AppState } from '../reducers/app-state'
import { ContactState } from '../reducers/contact.reducer';


@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html'
})

export class ContactDetailsComponent implements OnInit, OnDestroy {
  contactSubscription: any;
  myFriend: Contact;
  loading: boolean;
  saving: boolean;
  @BlockUI() blockUI: NgBlockUI;
  
  constructor(
    private store: Store<AppState>,
    private contactActions: ContactActions,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
  }
  
  ngOnInit(): void {
    // Subscribe for changes on the user state.
    let contactObservable: Observable<ContactState> = this.store.select('contact');
    this.contactSubscription = contactObservable.subscribe(
      (next) => { 
        this.myFriend = next.contact;

        if(next.loading || next.saving) {
          if(next.loading) {
            this.blockUI.start("Loading...");
          } else {
            this.blockUI.start("Saving...");
          }
        } else {
          this.blockUI.stop();
        }
      }
    );

    // Load the user according to the id parameter.
    this.route.params.subscribe(params => {
      if(params.id) {
        this.store.dispatch(this.contactActions.getContact(params.id));
      } else {
        this.store.dispatch(this.contactActions.resetBlankContact());
      }
    });
  }

  ngOnDestroy() {
    this.contactSubscription.unsubscribe();
  }

  save(form: any, contact: Contact) {
    // Verify that the form is valid.
    if(!form.invalid) {
        this.store.dispatch(this.contactActions.saveContact(contact));
    }
  }

  delete(contact: Contact) {
    // Ask for confirmation.
    if(confirm("Are you sure that you want to delete this contact?")) {
        this.store.dispatch(this.contactActions.deleteContact(contact));
        this.router.navigateByUrl('/list');
    }
  }
}
