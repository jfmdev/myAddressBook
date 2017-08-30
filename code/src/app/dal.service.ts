import { Injectable } from '@angular/core';
import { Contact } from './contact';
import * as PouchDB from '../../lib/pouchdb-5.3.2.min';

@Injectable()
export class DalService {
  myDb: any;
  allFun: any;
  
  constructor() {
    // Create/open database.
    this.myDb = new PouchDB('AddressBook');
    
    // Define auxiliary function.
    this.allFun = function(doc, emit) {
        emit(doc._id, doc);
    };
  }

  /**
   * Get the lists of contacts.
   * 
   * @returns {object} A promise.
   */
  list() : Promise<Contact[]> {
    return new Promise<Contact[]>((resolve, reject) => { 
      this.myDb.query(this.allFun, function(err, response) {
        if(!err) {
          // Parse result.
          var res = [];
          if(response && response.rows) {
              for(var i=0; i<response.rows.length; i++) {
                  res.push(response.rows[i].value);
              }
          }
          
          // Invoke callback.
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  }
  
  /**
   * Get a contact.
   * 
   * @param {string} id The contact's id.
   * @returns {object} A promise.
   */
  get(id: String) : Promise<Contact> {
    return new Promise<Contact>((resolve, reject) => { 
      this.myDb.get(id, function(err, doc) {
          if(!err) {
            resolve(doc)
          } else {
            reject(err);
          }
      });
    });
  }
  
  /**
   * Saves a contact.
   * 
   * @param {object} doc The contact's details.
   * @returns {object} A promise.
   */
  save(doc: any) : Promise<any> {
    // Verify if the contact is new or is an update.
    doc = doc || {};
    if(doc._id == null) {
        doc._id = 'id.' + new Date().getTime();
    }
    
    // Save contact.
    return this.myDb.put(doc, doc.id);
  }
  
  /**
   * Deletes a contact.
   * 
   * @param {string} doc The contact to delete.
   * @returns {object} A promise.
   */
  delete(doc) : Promise<any> {
    return this.myDb.remove(doc._id, doc._rev); 
  }
}
