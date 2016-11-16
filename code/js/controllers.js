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
// Declare application.
var controllersModule = angular.module('module.Controllers', ['module.Dal', 'blockUI']);

// Define controller.
controllersModule.controller('ListController', function ($scope, FriendsDAL, blockUI) {

    /**
     * Converts a value into an string suitable to be used as a field in a CSV file.
     * 
     * @param {mixed} value A value.
     * @returns {String} An string to be used in a CSV file.
     */
    function toCsvField(value) {
        // Cast to string.
        var res = value !== null && value !== undefined? value.toString() : '';
        
        // Replace double quotes.
        res = res.replace(new RegExp('"', 'g'), "'");
        
        // Add double quotes and return.
        return '"' + res + '"';
    }
    
    /**
     * Reads the list of contacts from the database.
     */
    function loadData() {
        // Block the user interface
        blockUI.start();
    
        // Read the list of contacts from the database.
        FriendsDAL.list(function(rows) {
            // Assign value.
            $scope.friends = rows;
            
            // Unblock UI and update it.
            blockUI.stop();
            $scope.$apply();
        });
    };
    
    /**
     * Downloads the current list of friends as a CSV file.
     */
    $scope.download = function() {
        // Generate CSV date.
        var csv = '"Name","Phone","Address","Email","Relative"\n';
        for(var i=0; i<$scope.friends.length; i++) {
            csv += toCsvField($scope.friends[i].name) + ',';
            csv += toCsvField($scope.friends[i].phone) + ',';
            csv += toCsvField($scope.friends[i].address) + ',';
            csv += toCsvField($scope.friends[i].email) + ',';
            csv += toCsvField($scope.friends[i].relative) + '\n';
        }
        
        // Generate CSV file.
        var blob = new Blob([csv], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "address_book.csv");
    };
    
    // Initialize and load list of friends.
    $scope.friends = [];
    loadData();
});


// Define controller.
controllersModule.controller('EditController', function ($scope, $location, $routeParams, FriendsDAL, blockUI) {
    /**
     * Deletes an entry.
     */
    $scope.delete = function(friend) {
        // Ask for confirmation.
        if(confirm("Are you sure that you want to delete this contact?")) {
            // Block the user interface
            blockUI.start();
            
            // Delete contact.
            FriendsDAL.delete(friend, function() {
                // Unblock the UI and display list of contacts.
                blockUI.stop();
                $location.path("/list");
                $scope.$apply();
            });
        }
    };

    /**
     * Save the contact that is currently being edited.
     */
    $scope.save = function(form, friend) {
        // Verify that the form is valid.
        if(!form.$invalid) {
            // Block the user interface
            blockUI.start();

            // Save contact.
            FriendsDAL.save(friend, function() {
                // Unblock the UI and display list of contacts.
                blockUI.stop();
                $location.path("/list");
                $scope.$apply();
            });
        }
    };
    
    // Initialize empty friend.
    $scope.friend = {
        _id : null,
        name : "",
        email : "",
        phone : "",
        address : "",
        relative : false      
    };

    // If editing a contact, load his data from the database.
    if($routeParams.id) {
        // Block the user interface
        blockUI.start();
        
        // Is an existing contact, load it from the database.
        FriendsDAL.get($routeParams.id, function(doc) {
            // Set contact info to form.
            $scope.friend = doc;
           
            // Unblock UI and update it.
            blockUI.stop();
            $scope.$apply();
        });            
    }
});
