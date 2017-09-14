export class Contact {
  _id: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  relative: boolean;
  
 constructor() { 
  this._id = null;
  this.name = '';
  this.phone = '';
  this.address = '';
  this.email = '';
  this.relative = false;
 }
}
