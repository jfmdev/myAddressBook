import { Injectable } from '@angular/core';
import { Contact } from './contact';

let FRIENDS = [
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

@Injectable()
export class DalService {
  getContacts() : Promise<Contact[]> {
    return new Promise(resolve => {
      resolve(FRIENDS);
    });
  }

  constructor() { }

}
