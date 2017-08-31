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
 // Declare module.
var myApp = angular.module('addressBookApp', ['module.Controllers', 'ngRoute']);

// Define routes.
myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/list', {
            controller: 'ListController',
            templateUrl: 'views/list.html'
        })
        .when('/edit/:id?', {
            controller: 'EditController',
            templateUrl: 'views/edit.html'
        })
        .otherwise({
            redirectTo: '/list'
        });
}]);

