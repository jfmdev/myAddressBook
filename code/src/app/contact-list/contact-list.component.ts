import { Component, Input } from '@angular/core';
import { Contact } from '../contact';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html'
})

export class ContactListComponent {
  @Input() friends: Contact[];
  
  selectedFriend: Contact = null;
  onSelect(friend: Contact): void {
    this.selectedFriend = friend;
  } 
}
