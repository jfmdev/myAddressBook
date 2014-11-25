/*
 *  Copyright (C) 2014 Jose F. Maldonado
 *  This file is part of ngAddressBook.
 *  
 *  ngAddressBook is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  ngAddressBook is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with ngAddressBook. If not, see <http://www.gnu.org/licenses/>.
 */

// Create database.
var myDb = new PouchDB('AddressBook');

// Define namespace in which to include all database-related methods.
var DAL = DAL || {};

/**
 * Fun function for retrieve all entries in the database.
 */
DAL.allFun = function (doc) {
    emit(doc._id, doc);
};

/**
 * Get the lists of contacts.
 * 
 * @param {function} callback The function that is called when the operation has been done.
 */
DAL.list = function (callback) {
    myDb.query(DAL.allFun, function(err, response) {
        // Parse result.
        var res = [];
        for(var i=0; i<response.rows.length; i++) {
            res.push(response.rows[i].value);
        }
        
        // Invoke callback.
        if(callback !== null && callback !== undefined) {
            callback(res);
        }
    });
};

/**
 * Get a contact.
 * 
 * @param {string} id The contact's id.
 * @param {function} callback The function that is called when the operation has been done.
 * @returns {object} A contact
 */
DAL.get = function (id, callback) {
    myDb.get(id, function(err, doc) {
        if(callback !== null && callback !== undefined) callback(doc);
    });
};

/**
 * Deletes a contact.
 * 
 * @param {string} doc The contact to delete.
 * @param {function} callback The function that is called when the operation has been done.
 */
DAL.delete = function (doc, callback) {
    myDb.remove(doc._id, doc._rev, function(err, response) {
        if(callback !== null && callback !== undefined) callback();
    }); 
};

/**
 * Deletes all contacts.
 * 
 * @param {function} callback The function that is called when the operation has been done.
 */
DAL.deleteAll = function (callback) {
    DAL.list(function(rows) {
        // Verify that the database is not empty.
        if(rows !== null && rows !== undefined && rows.length > 0) {
            // Set the deleted field to true.
            for(var i=0; i<rows.length; i++) {
                rows[i]._deleted = true;
            }
            
            // Update all docs.
            myDb.bulkDocs(rows, function(err, response) {
                // Invoke callback.
                if(callback !== null && callback !== undefined) callback();
            });
        }
    });
};

/**
 * Saves a contact.
 * 
 * @param {object} doc The contact's details.
 * @param {function} callback The function that is called when the operation has been done.
 */
DAL.save = function (doc, callback) {
    // Verify if the contact is new or is an update.
    if(doc._id === null) {
        doc._id = 'id.' + new Date().getTime();
    }
    
    // Save contact.
    myDb.put(doc, doc.id, function(err, response) {
        if(callback !== null && callback !== undefined) callback();
    });
};
