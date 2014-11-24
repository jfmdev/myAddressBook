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
var addressBookApp = angular.module('addressBookApp', []);
// https://docs.angularjs.org/tutorial/step_05

addressBookApp.controller('BookCtrl', function ($scope) {

    // Define initial state.
    $scope.appState = 'list';
  
    // Get list of friends.
    $scope.friends = [
        { id : 1,
        name : "John",
        email : "john@something.com",
        phone : "12 34 56 78",
        address : "Somewhere",
        relative : true },
        { id : 2,
        name : "Jane",
        email : "jane@something.com",
        phone : "01 23 45 67",
        address : "Nowhere",
        relative : false }
    ];
  
    // Define object used for the edition form.
    $scope.activeEntry = {
        id : null,
        name : "asdf",
        email : "asdf",
        phone : "asdf",
        address : "adsf",
        relative : false
    };

    $scope.showList = function() {
        $scope.appState = "list";
        return false;
    };

    $scope.deleteEntry = function() {
        var del = confirm("Are you sure that you want to delete this contact?")
        if(del) {
            $scope.appState = "list";
        }
        return false;
    };

    $scope.saveEntry = function() {
        $scope.appState = "list";
        return false;
    };
    

    $scope.editEntry = function(id) {
        //alert(id);
        $scope.activeEntry.id = id;
        $scope.appState = "edit";
        return false;
    };
});
