import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap'
import { Contact } from '../contact';
import { DalService } from '../dal.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html'
})

export class ContactDetailsComponent implements OnInit {
  myFriend: Contact;
  
  constructor(
    private dalService: DalService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  
  ngOnInit(): void {
    this.myFriend = new Contact();
    
    this.route.paramMap
      .switchMap((params: ParamMap) => this.dalService.get(params.get('id')))
      .subscribe(contact => this.myFriend = contact);
  }

  goBack(): void {
    this.location.back();
  }
}
