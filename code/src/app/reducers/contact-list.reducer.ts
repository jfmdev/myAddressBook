import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {Contact} from '../models/contact';
import {UnsafeAction} from '../actions/unsafeAction';
import {ContactActions} from '../actions/contact.actions';
import * as _ from 'lodash';

export interface ContactListState {
  list: Contact[];
  loading: boolean;
};

const initialState: ContactListState = {
  list: [],
  loading: false
};

export function ContactListReducer(state = initialState, action: UnsafeAction): ContactListState {
  switch (action.type) {
    case ContactActions.LOAD_CONTACTS: {
      return _.assign({}, state, {
        loading: true
      });
    }

    case ContactActions.LOAD_CONTACTS_SUCCESS: {
      return _.assign({}, state, {
        list: action.payload,
        loading: false
      });
    }

    case ContactActions.SAVE_CONTACT_SUCCESS: {
      let index = _.findIndex(state.list, {id: action.payload.id});
      if (index >= 0) {
        return _.assign({}, state, {
          list: [
            ...state.list.slice(0, index),
            action.payload,
            ...state.list.slice(index + 1)
          ]
        });
      }
      return state;
    }

    case ContactActions.DELETE_CONTACT_SUCCESS: {
        return _.assign({}, state, {
          list: state.list.filter(contact => {
            return contact._id !== action.payload._id;
          })
        });
    }

    default: {
      return state;
    }
  }
}