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

var DalMiddleware = function(store) {
    return function(next) {
        return function(action) {
            // Pass all actions through by default
            next(action);

            // Check action type and handle it.
            switch (action.type) {
                case ActionTypes.LOAD_CONTACTS:
                    // Make async request.
                    FriendsDAL.list(function(res) {       
                        // Return result.
                        next(Actions.loadContactsSuccess(res));
                    });
                    break

                case ActionTypes.GET_CONTACT:
                    // Make async request.
                    FriendsDAL.get(action.payload, function(res) {   
                        // Return result.
                        next(Actions.getContactSuccess(res));
                    });
                    break

                case ActionTypes.SAVE_CONTACT:
                    // Make async request.
                    FriendsDAL.save(action.payload, function(id) {
                        FriendsDAL.get(id, function(res) {
                            // Return result.
                            next(Actions.saveContactSuccess(res));
                        });
                    });
                    break

                case ActionTypes.DELETE_CONTACT:
                    // Make async request.
                    FriendsDAL.delete(action.payload, function(res) {
                        // Return result.
                        next(Actions.deleteContactSuccess(res));
                    });
                    break

                // Do nothing if the action does not interest us
                default:
                    break
            }
        };
    };
}; 
