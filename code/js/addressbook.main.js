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
// Declare application.
var addressBookApp = angular.module('addressBookApp', []);

// Define controller.
addressBookApp.controller('BookCtrl', function ($scope) {

    // ----- Private functions ----- //

    /**
     * Clears the values of the active entry.
     */
    resetActiveEntry = function() {
        $scope.activeEntry = {
            _id : null,
            name : "",
            email : "",
            phone : "",
            address : "",
            relative : false
        };
    };
    
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
    
    // ----- Scope functions ----- //
    
    /**
     * Shows the list of contacts.
     * 
     * @param {type} reload
     * @returns {Boolean} Always returns 'false'.
     */
    $scope.showList = function(reload) {
        // Verify if the list of contacts must be reloaded from the database or if only must be show.
        if(reload === true) {
            // Change the state to loading.
            $scope.appState = "loading";
            
            // Read the list of contacts from the database.
            DAL.list(function(rows) {
                // Assign value.
                $scope.friends = rows;
                
                // Change state to list and notify angular.
                $scope.appState = "list";
                $scope.$apply();
            });
        } else {
            // Change the state to list.
            $scope.appState = "list";
        }
        return false;
    };
    
    /**
     * 
     * @returns {Boolean} Always returns 'false'.
     */
    $scope.deleteEntry = function() {
        // Change state to loading.
        $scope.appState = "loading";
        
        // Ask for confirmation.
        var del = confirm("Are you sure that you want to delete this contact?");
        if(del) {
            // Delete contact.
            DAL.delete($scope.activeEntry, function() {
                // Once the contact has been deleted, refresh the list of contacts and show it.
                $scope.showList(true);
            });
        }
        return false;
    };

    /**
     * Save the contact that is currently being edited.
     * 
     * @returns {Boolean} Always returns 'false'.
     */
    $scope.saveEntry = function() {
        // Change state to loading.
        $scope.appState = "loading";
        
        // Save contact.
        DAL.save($scope.activeEntry, function() {
            // Once the contact has been saved, refresh the list of contacts and show it.
            $scope.showList(true);
        });
        return false;
    };
    
    /**
     * Open a form to edit a contact.
     * 
     * @param {string} id The id of the contact to edit.
     * @returns {Boolean} Always returns 'false'.
     */
    $scope.editEntry = function(id) {
        // Change the state to loading.
        $scope.appState = "loading";
        
        // Verify if is a new contact or not.
        if(id !== null && id !== undefined) {
            // Is an existing contact, load it from the database.
            DAL.get(id, function(doc) {
                // Set contact info to form.
                $scope.activeEntry = doc;
               
                // Change state to edit and notify to angular.
                $scope.appState = "edit";
                $scope.$apply();
            });            
        } else {
            // Is a new contact, clear the form.
            resetActiveEntry();
            
            // Change state to edit.
            $scope.appState = "edit";
        }
        return false;
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
    
    // ----- Initilization ----- //

    // Initialize variables.
    $scope.appState = 'list';
    $scope.friends = [];
    $scope.activeEntry = {};

    // Load list of contacts.
    $scope.showList(true);
    
    /**
     * PENDIENTE
     * - Terminar DAL para que los callback devuelvan los datos ya procesados
     * - QUnit para DAL
     * - Testing con Selenium
     * 
     * - Crear proyecto en Github
     * - Subir proyecto a Github
     * - Crear pagina del proyecto
     * - Subir demo a esta pagina
     */
});
