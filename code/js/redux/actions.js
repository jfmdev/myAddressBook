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
var ActionTypes = {
    RESET_BLANK_CONTACT: '[Contact] Reset Blank Contact',
    LOAD_CONTACTS: '[Contact] Load Contacts',
    LOAD_CONTACTS_SUCCESS: '[Contact] Load Contacts Success',
    LOAD_CONTACTS_ERROR: '[Contact] Load Contacts Error',
    GET_CONTACT: '[Contact] Get Contact',
    GET_CONTACT_SUCCESS: '[Contact] Get Contact Success',
    GET_CONTACT_ERROR: '[Contact] Get Contact Error',
    SAVE_CONTACT: '[Contact] Save Contact',
    SAVE_CONTACT_SUCCESS: '[Contact] Save Contact Success',
    SAVE_CONTACT_ERROR: '[Contact] Save Contact Error',
    DELETE_CONTACT: '[Contact] Delete Contact',
    DELETE_CONTACT_SUCCESS: '[Contact] Delete Contact Success',
    DELETE_CONTACT_ERROR: '[Contact] Delete Contact Error',
};
 
var Actions = {
    resetBlankContact: function() {
        return {
            type: ActionTypes.RESET_BLANK_CONTACT
        };
    },

    loadContacts: function() {
        return {
            type: ActionTypes.LOAD_CONTACTS
        };
    },

    loadContactsSuccess: function(contacts) {
        return {
            type: ActionTypes.LOAD_CONTACTS_SUCCESS,
            payload: contacts
        };
    },

    loadContactsError: function(err) {
        return {
            type: ActionTypes.LOAD_CONTACTS_ERROR,
            payload: err
        };
    },

    getContact: function(id) {
        return {
            type: ActionTypes.GET_CONTACT,
            payload: id
        };
    },

    getContactSuccess: function(contact) {
        return {
            type: ActionTypes.GET_CONTACT_SUCCESS,
            payload: contact
        };
    },

    getContactError: function(err) {
        return {
            type: ActionTypes.GET_CONTACT_ERROR,
            payload: err
        };
    },

    saveContact: function(contact) {
        return {
            type: ActionTypes.SAVE_CONTACT,
            payload: contact
        };
    },

    saveContactSuccess: function(contact) {
        return {
            type: ActionTypes.SAVE_CONTACT_SUCCESS,
            payload: contact
        };
    },

    saveContactError: function(err) {
        return {
            type: ActionTypes.SAVE_CONTACT_ERROR,
            payload: err
        };
    },

    deleteContact: function(contact) {
        return {
            type: ActionTypes.DELETE_CONTACT,
            payload: contact
        };
    },

    deleteContactSuccess: function(contact) {
        return {
            type: ActionTypes.DELETE_CONTACT_SUCCESS,
            payload: contact
        };
    },

    deleteContactError: function(err) {
        return {
            type: ActionTypes.DELETE_CONTACT_ERROR,
            payload: err
        };
    }
}
