"use strict";

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
// Load dependencies.
var _ReactRouter = ReactRouter,
    Router = _ReactRouter.Router,
    Route = _ReactRouter.Route,
    IndexRoute = _ReactRouter.IndexRoute,
    IndexLink = _ReactRouter.IndexLink,
    Link = _ReactRouter.Link,
    hashHistory = _ReactRouter.hashHistory;

// Declare routes.

ReactDOM.render(React.createElement(
    Router,
    { history: hashHistory },
    React.createElement(
        Route,
        { path: "/", component: App },
        React.createElement(IndexRoute, { component: ListEntries }),
        React.createElement(Route, { path: "list", component: ListEntries }),
        React.createElement(Route, { path: "edit(/:id)", component: EditEntry })
    )
), document.getElementById('root'));