import { Component, Input, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DalService } from '../dal.service';
import { Contact } from '../contact';
import * as saveAs from '../../../lib/FileSaver';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html'
})

export class ContactListComponent implements OnInit {
  friends: Contact[];
  @BlockUI() blockUI: NgBlockUI;

  constructor(private dalService: DalService) {
  }
  
  ngOnInit(): void {
    this.blockUI.start('Loading...');
    this.dalService.list().then(result => {
      this.friends = result;
      this.blockUI.stop();
    });
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
