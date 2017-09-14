import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Contact } from '../models/contact';
import { DalService } from '../services/dal.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html'
})

export class ContactDetailsComponent implements OnInit {
  myFriend: Contact;
  @BlockUI() blockUI: NgBlockUI;
  
  constructor(
    private dalService: DalService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {
    this.myFriend = new Contact();
  }
  
  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
          var docId = params.get('id');
          var promise : Promise<Contact> = (docId)? this.dalService.get(docId) : new Promise<Contact>((resolve, reject) => { resolve(new Contact()) });
          return promise;
      }).subscribe(contact => this.myFriend = contact);
  }

  save(form: any, contact: Contact) {
    // Verify that the form is valid.
    if(!form.invalid) {
      // Block the user interface
      this.blockUI.start("Saving...");

      // Save contact.
      this.dalService.save(contact).then(() => {
        // Unblock the UI and display list of contacts.
        this.blockUI.stop();
        this.router.navigateByUrl('/list');
      }).catch((err) => {
        console.log(err);
        this.blockUI.stop();
      });
    }
  }

  delete(contact: Contact) {
    // Ask for confirmation.
    if(confirm("Are you sure that you want to delete this contact?")) {
      // Block the user interface
      this.blockUI.start("Deleting...");
      
      // Delete contact.
      this.dalService.delete(contact).then(() => {
        // Unblock the UI and display list of contacts.
        this.blockUI.stop();
        this.router.navigateByUrl('/list');
      }).catch((err) => {
        console.log(err);
        this.blockUI.stop();
      });
    }
  }
}
