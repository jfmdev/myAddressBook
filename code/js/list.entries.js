"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var ListEntries = function (_React$Component) {
    _inherits(ListEntries, _React$Component);

    /**
     * Constructor function.
     */
    function ListEntries(props) {
        _classCallCheck(this, ListEntries);

        var _this = _possibleConstructorReturn(this, (ListEntries.__proto__ || Object.getPrototypeOf(ListEntries)).call(this, props));

        _this.state = {};
        return _this;
    }

    /**
     * Did mount function.
     */


    _createClass(ListEntries, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            $.blockUI();
            FriendsDAL.list(function (res) {
                this.setState({ friends: res });
                $.unblockUI();
            }.bind(this));
        }

        /**
         * Render function.
         */

    }, {
        key: "render",
        value: function render() {
            // Parse list of friends.
            var friends_rows = [];
            this.state.friends = this.state.friends || [];
            for (var i = 0; i < this.state.friends.length; i++) {
                var friend = this.state.friends[i];
                friends_rows.push(React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        null,
                        friend.name
                    ),
                    React.createElement(
                        "td",
                        null,
                        friend.phone
                    ),
                    React.createElement(
                        "td",
                        null,
                        friend.email
                    ),
                    React.createElement(
                        "td",
                        null,
                        friend.address
                    ),
                    React.createElement(
                        "td",
                        null,
                        friend.relative && React.createElement("span", { className: "glyphicon glyphicon-ok" }),
                        !friend.relative && React.createElement("span", { className: "glyphicon glyphicon-remove" })
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            Link,
                            { className: "btn btn-default", to: "/edit/" + friend._id },
                            "Edit"
                        )
                    )
                ));
            }

            // Return view.
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "panel panel-success" },
                    React.createElement(
                        "div",
                        { className: "panel-heading" },
                        "List of contacts"
                    ),
                    React.createElement(
                        "table",
                        { className: "table table-striped table-bordered text-center" },
                        React.createElement(
                            "thead",
                            null,
                            React.createElement(
                                "tr",
                                null,
                                React.createElement(
                                    "th",
                                    null,
                                    "Name"
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    "Phone"
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    "Address"
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    "E-mail"
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    "Relative"
                                ),
                                React.createElement("th", null)
                            )
                        ),
                        React.createElement(
                            "tbody",
                            null,
                            friends_rows
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "text-right" },
                    this.state.friends.length > 0 && React.createElement(
                        "span",
                        null,
                        React.createElement(
                            "button",
                            { type: "submit", className: "btn btn-default", onClick: this.downloadCsv.bind(this) },
                            React.createElement("span", { className: "glyphicon glyphicon-download" }),
                            "Download CSV"
                        ),
                        "\xA0"
                    ),
                    React.createElement(
                        Link,
                        { className: "btn btn-default", to: "/edit" },
                        React.createElement("span", { className: "glyphicon glyphicon-plus" }),
                        "New contact"
                    )
                )
            );
        }

        /**
         * Downloads the current list of friends as a CSV file.
         */

    }, {
        key: "downloadCsv",
        value: function downloadCsv() {
            // Generate CSV date.
            var csv = '"Name","Phone","Address","Email","Relative"\n';
            for (var i = 0; i < this.state.friends.length; i++) {
                csv += this._toCsvField(this.state.friends[i].name) + ',';
                csv += this._toCsvField(this.state.friends[i].phone) + ',';
                csv += this._toCsvField(this.state.friends[i].address) + ',';
                csv += this._toCsvField(this.state.friends[i].email) + ',';
                csv += this._toCsvField(this.state.friends[i].relative) + '\n';
            }

            // Generate CSV file.
            var blob = new Blob([csv], { type: "text/plain;charset=utf-8" });
            saveAs(blob, "address_book.csv");
        }

        /**
         * Converts a value into an string suitable to be used as a field in a CSV file.
         * 
         * @param {mixed} value A value.
         * @returns {String} An string to be used in a CSV file.
         */

    }, {
        key: "_toCsvField",
        value: function _toCsvField(value) {
            // Cast to string.
            var res = value !== null && value !== undefined ? value.toString() : '';

            // Replace double quotes.
            res = res.replace(new RegExp('"', 'g'), "'");

            // Add double quotes and return.
            return '"' + res + '"';
        }
    }]);

    return ListEntries;
}(React.Component);