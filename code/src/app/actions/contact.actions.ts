import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Contact } from '../models/contact';
import { UnsafeAction } from './unsafeAction';

@Injectable()
export class ContactActions {
  static RESET_BLANK_CONTACT = '[Contact] Reset Blank Contact';
  resetBlankContact(): Action {
    return {
      type: ContactActions.RESET_BLANK_CONTACT
    };
  }

  static LOAD_CONTACTS = '[Contact] Load Contacts';
  loadContacts(): Action {
    return {
      type: ContactActions.LOAD_CONTACTS
    };
  }

  static LOAD_CONTACTS_SUCCESS = '[Contact] Load Contacts Success';
  loadContactsSuccess(contacts): UnsafeAction {
    return {
      type: ContactActions.LOAD_CONTACTS_SUCCESS,
      payload: contacts
    };
  }

  static GET_CONTACT = '[Contact] Get Contact';
  getContact(id): UnsafeAction {
    return {
      type: ContactActions.GET_CONTACT,
      payload: id
    };
  }

  static GET_CONTACT_SUCCESS = '[Contact] Get Contact Success';
  getContactSuccess(contact): UnsafeAction {
    return {
      type: ContactActions.GET_CONTACT_SUCCESS,
      payload: contact
    };
  }

  static SAVE_CONTACT = '[Contact] Save Contact';
  saveContact(contact): UnsafeAction {
    return {
      type: ContactActions.SAVE_CONTACT,
      payload: contact
    };
  }

  static SAVE_CONTACT_SUCCESS = '[Contact] Save Contact Success';
  saveContactSuccess(contact): UnsafeAction {
    return {
      type: ContactActions.SAVE_CONTACT_SUCCESS,
      payload: contact
    };
  }

  static DELETE_CONTACT = '[Contact] Delete Contact';
  deleteContact(contact): UnsafeAction {
    return {
      type: ContactActions.DELETE_CONTACT,
      payload: contact
    };
  }

  static DELETE_CONTACT_SUCCESS = '[Contact] Delete Contact Success';
  deleteContactSuccess(contact): UnsafeAction {
    return {
      type: ContactActions.DELETE_CONTACT_SUCCESS,
      payload: contact
    };
  }
}