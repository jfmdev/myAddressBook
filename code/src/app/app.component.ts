import { Component } from '@angular/core';
import { Contact } from './contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  selectedFriend: Contact = null;
  friends: Contact[] = [
    {
      name: 'John',
      phone: '123',
      address: 'Fake street',
      email: 'mail@mail',
      relative: true
    },
    {
      name: 'Jane',
      phone: '456',
      address: 'Fake street',
      email: 'mail@mail',
      relative: true
    }
  ];
  onSelect(friend: Contact): void {
    this.selectedFriend = friend;
  } 
}

