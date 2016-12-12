/*
 *  Copyright (C) 2014 Jose F. Maldonado
 *  This file is part of myAddressBook.
 *  
 *  myAddressBook is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  myAddressBook is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with myAddressBook. If not, see <http://www.gnu.org/licenses/>.
 */
// Initialize namespace and database.
FriendsDAL = {};
FriendsDAL.myDb = new PouchDB('AddressBook');

/**
 * Function for retrieve all entries in the database.
 */
FriendsDAL.allFun = function (doc) {
    emit(doc._id, doc);
};

/**
 * Get the lists of contacts.
 * 
 * @param {function} callback The function that is called when the operation has been done.
 */
FriendsDAL.list = function (callback) {
    FriendsDAL.myDb.query(FriendsDAL.allFun, function(err, response) {
        // Parse result.
        var res = [];
        if(response !== undefined && response !== null && response.rows !== undefined && response.rows !== null) {           
            for(var i=0; i<response.rows.length; i++) {
                res.push(response.rows[i].value);
            }
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
FriendsDAL.get = function (id, callback) {
    FriendsDAL.myDb.get(id, function(err, doc) {
        if(callback !== null && callback !== undefined) callback(doc);
    });
};

/**
 * Deletes a contact.
 * 
 * @param {string} doc The contact to delete.
 * @param {function} callback The function that is called when the operation has been done.
 */
FriendsDAL.delete = function (doc, callback) {
    if(doc !== null && doc !== undefined) {
        FriendsDAL.myDb.remove(doc._id, doc._rev, function(err, response) {
            if(callback !== null && callback !== undefined) callback();
        }); 
    }
};

/**
 * Deletes all contacts.
 * 
 * @param {function} callback The function that is called when the operation has been done.
 */
FriendsDAL.deleteAll = function (callback) {
    FriendsDAL.list(function(rows) {
        // Verify that the database is not empty.
        if(rows !== null && rows !== undefined && rows.length > 0) {
            // Set the deleted field to true.
            for(var i=0; i<rows.length; i++) {
                rows[i]._deleted = true;
            }
            
            // Update all docs.
            FriendsDAL.myDb.bulkDocs(rows, function(err, response) {
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
FriendsDAL.save = function (doc, callback) {
    // Check that the contact is not null.
    if(doc === null || doc === undefined) {
        doc = {};
    }
    
    // Verify if the contact is new or is an update.
    if(doc._id == null) {
        doc._id = 'id.' + new Date().getTime();
    }
    
    // Save contact.
    FriendsDAL.myDb.put(doc, doc.id, function(err, response) {
        if(callback !== null && callback !== undefined) callback();
    });
};
