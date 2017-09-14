import {Action} from '@ngrx/store';

import {Contact} from '../models/contact';
import {ContactActions} from '../actions/contact.actions';
import {UnsafeAction} from '../actions/unsafeAction';
import * as _ from 'lodash';

export interface ContactState {
  contact: Contact;
  loading: boolean;
  saving: boolean;
};

const initialState: ContactState = {
  contact: new Contact(),
  loading: false,
  saving: false
};

export function ContactReducer(state = initialState, action: UnsafeAction): ContactState {
  switch (action.type) {
    case ContactActions.RESET_BLANK_CONTACT: {
      return _.assign({}, state, {
        contact: _.cloneDeep(initialState),
        loading: false,
        saving: false
      });
    }

    case ContactActions.GET_CONTACT: {
      return _.assign({}, state, {
        loading: true
      });
    }

    case ContactActions.SAVE_CONTACT: {
      return _.assign({}, state, {
        saving: true
      });
    }

    case ContactActions.GET_CONTACT_SUCCESS: {
      return _.assign({}, state, {
        contact: action.payload,
        loading: false,
        saving: false
      });
    }

    case ContactActions.SAVE_CONTACT_SUCCESS: {
      return _.assign({}, state, {
        contact: action.payload,
        loading: false,
        saving: false
      });
    }

    default: {
      return state;
    }
  }
}