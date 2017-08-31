import { Component, Input, OnInit } from '@angular/core';
import { DalService } from '../dal.service';
import { Contact } from '../contact';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html'
})

export class ContactListComponent implements OnInit {
  friends: Contact[];

  constructor(private dalService: DalService) {
  }
  
  ngOnInit(): void {
    this.dalService.list().then(result => {
      this.friends = result;
    });
  }
}
