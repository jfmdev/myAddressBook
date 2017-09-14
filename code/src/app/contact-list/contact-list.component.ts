import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as saveAs from '../../../lib/FileSaver';

import { Contact } from '../models/contact';
import { ContactActions } from '../actions/contact.actions';
import { AppState } from '../reducers/app-state'
import { ContactListState } from '../reducers/contact-list.reducer';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html'
})

export class ContactListComponent implements OnInit, OnDestroy {
  contactListSubscription: any;
  friends: Contact[];
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private store: Store<AppState>,
    private contactActions: ContactActions
    ) { 
  }
  
  ngOnInit(): void {
    // Subscribe for changes on the contact list state.
    let contactListObservable: Observable<ContactListState> = this.store.select('contactList');
    this.contactListSubscription = contactListObservable.subscribe(
      (next) => { 
        this.friends = next.list;
        
        if(next.loading) {
          this.blockUI.start('Loading...');
        } else {
          this.blockUI.stop();
        }
      }
    );

    // Load contacts.
    this.store.dispatch(this.contactActions.loadContacts());
  }

  ngOnDestroy() {
    this.contactListSubscription.unsubscribe();
  }

  download(): void {
    // Generate CSV data.
    var csv = '"Name","Phone","Address","Email","Relative"\n';
    for(var i=0; i<this.friends.length; i++) {
        csv += toCsvField(this.friends[i].name) + ',';
        csv += toCsvField(this.friends[i].phone) + ',';
        csv += toCsvField(this.friends[i].address) + ',';
        csv += toCsvField(this.friends[i].email) + ',';
        csv += toCsvField(this.friends[i].relative) + '\n';
    }
    
    // Generate CSV file.
    var blob : Blob = new Blob([csv], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "address_book.csv");
  }
}

/**
 * Converts a value into an string suitable to be used as a field in a CSV file.
 * 
 * @param {mixed} value A value.
 * @returns {String} An string to be used in a CSV file.
 */
function toCsvField(value) {
  // Cast to string.
  var res = value !== null && value !== undefined? value.toString() : '';
  
  // Replace double quotes.
  res = res.replace(new RegExp('"', 'g'), "'");
  
  // Add double quotes and return.
  return '"' + res + '"';
}