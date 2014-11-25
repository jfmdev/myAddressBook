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
        { _id : 1,
        name : "John",
        email : "john@something.com",
        phone : "12 34 56 78",
        address : "Somewhere",
        relative : true },
        { _id : 2,
        name : "Jane",
        email : "jane@something.com",
        phone : "01 23 45 67",
        address : "Nowhere",
        relative : false }
    ];
    $scope.friends = [];
  
    // Define object used for the edition form.
    $scope.activeEntry = {};

    $scope.resetActiveEntry = function() {
        $scope.activeEntry = {
            _id : null,
            name : "",
            email : "",
            phone : "",
            address : "",
            relative : false
        };
    };
    $scope.resetActiveEntry();
    
    // TENGO QUE MOSTRAR UN MENU DE ESPERA CADA VEZ QUE SE ESPERE A UN CALLBACK
    // TAL VEZ CON UN appState = 'loading'.
    
    $scope.showList = function(reload) {
        if(reload === true) {
            $scope.appState = "loading";
            DAL.list(function(err, response) {
                console.log("showList - " + err + " - " + response);
                $scope.friends.length = 0;
                for(var i=0; i<response.rows.length; i++) {
                    $scope.friends.push(response.rows[i].value);
                }
                $scope.appState = "list";
                $scope.$apply();
            });
        } else {
            $scope.appState = "list";
        }
        return false;
    };
    $scope.showList(true);
    
    $scope.deleteEntry = function() {
        $scope.appState = "loading";
        var del = confirm("Are you sure that you want to delete this contact?")
        if(del) {
            DAL.delete($scope.activeEntry, function(err, response) {
                $scope.showList(true);
            });
        }
        return false;
    };

    $scope.saveEntry = function() {
        $scope.appState = "loading";
        DAL.save($scope.activeEntry, function(res, doc) {
            console.log("saveEntry " + res +" - " + doc + " -- " + Object.keys(doc) + " -- " + Object.keys($scope.activeEntry));
            $scope.showList(true);
        });
        return false;
    };
    

    $scope.editEntry = function(id) {
        $scope.appState = "loading";
        if(id !== null && id !== undefined) {
            console.log("editEntry - update " + id);
            DAL.get(id, function(err, doc) {
               $scope.activeEntry = doc;
               console.log("editEntry - update = " + doc);
               $scope.appState = "edit";
               $scope.$apply();
            });            
        } else {
            console.log("editEntry - new");
            $scope.resetActiveEntry();
            $scope.appState = "edit";
        }
        return false;
    };
});
