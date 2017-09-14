import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {Contact} from '../models/contact';
import {UnsafeAction} from '../actions/unsafeAction';
import {ContactActions} from '../actions/contact.actions';
import * as _ from 'lodash';

export type ContactListState = Contact[];

const initialState: ContactListState = [];

export function ContactListReducer(state = initialState, action: UnsafeAction): ContactListState {
  switch (action.type) {
    case ContactActions.LOAD_CONTACTS_SUCCESS: {
      return action.payload;
    }
    case ContactActions.SAVE_CONTACT_SUCCESS: {
      let index = _.findIndex(state, {id: action.payload.id});
      if (index >= 0) {
        return [
          ...state.slice(0, index),
          action.payload,
          ...state.slice(index + 1)
        ];
      }
      return state;
    }
    case ContactActions.DELETE_CONTACT_SUCCESS: {
      return state.filter(contact => {
        return contact._id !== action.payload._id;
      });
    }
    default: {
      return state;
    }
  }
}