import { Component, Input } from '@angular/core';
import { Contact } from '../contact';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html'
})

export class ContactDetailsComponent {
  @Input() myFriend: Contact;
}
