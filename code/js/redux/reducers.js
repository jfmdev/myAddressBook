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
 
 // Define contact initial state.
 var contactInitialState = {
    contact: { 
        _id: null,
        name: '',
        phone: '',
        address: '',
        email: '',
        relative: false
    },
    loading: false,
    saving: false
};

// Define contact reducer.
function contactReducer(state, action) {
    state = state || contactInitialState;

    switch(action.type) {
        case ActionTypes.RESET_BLANK_CONTACT:
            return _.assign({}, state, {
                contact: _.cloneDeep(contactInitialState.contact),
                loading: false,
                saving: false
            });

        case ActionTypes.GET_CONTACT:
            return _.assign({}, state, {
                loading: true
            });

        case ActionTypes.SAVE_CONTACT:
            return _.assign({}, state, {
                saving: true
            });

        case ActionTypes.GET_CONTACT_SUCCESS:
            return _.assign({}, state, {
                contact: action.payload,
                loading: false,
                saving: false
            });

        case ActionTypes.GET_CONTACT_ERROR:
            return _.assign({}, state, {
                contact: _.cloneDeep(initialState.contact),
                loading: false,
                saving: false
            });

        case ActionTypes.SAVE_CONTACT_SUCCESS:
            return _.assign({}, state, {
                contact: action.payload,
                loading: false,
                saving: false
            });

        case ActionTypes.SAVE_CONTACT_ERROR:
            return _.assign({}, state, {
                loading: false,
                saving: false
            });

        default:
            return state;
    }
}

 // Define contacts initial state.
var contactListInitialState = {
    list: [],
    loading: false
};

// Define contact list reducer.
function contactListReducer(state, action) {
    state = state || contactListInitialState;

    switch(action.type) {
        case ActionTypes.LOAD_CONTACTS:
            return _.assign({}, state, {
                loading: true
            });

        case ActionTypes.LOAD_CONTACTS_SUCCESS:
            return _.assign({}, state, {
                list: action.payload,
                loading: false
            });

        case ActionTypes.LOAD_CONTACTS_ERROR:
            return _.assign({}, state, {
                loading: false
            });

        case ActionTypes.SAVE_CONTACT_SUCCESS:
            let index = _.findIndex(state.list, {_id: action.payload._id});
            if (index >= 0) {
                return _.assign({}, state, {
                    list: _.union(
                        state.list.slice(0, index),
                        [action.payload],
                        state.list.slice(index + 1)
                    )
                });
            }
            return state;

        case ActionTypes.DELETE_CONTACT_SUCCESS:
            return _.assign({}, state, {
                list: _.filter(state.list, function(contact) {
                    return contact._id !== action.payload._id;
                })
            });

        default:
            return state;
    }
}

// Combine reducers.
var Reducers = Redux.combineReducers({
    contactReducer,
    contactListReducer
});
