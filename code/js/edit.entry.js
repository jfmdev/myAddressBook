"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
var EditEntry = function (_React$Component) {
    _inherits(EditEntry, _React$Component);

    /**
     * Constructor function.
     */
    function EditEntry(props) {
        _classCallCheck(this, EditEntry);

        // Initialize state.
        var _this = _possibleConstructorReturn(this, (EditEntry.__proto__ || Object.getPrototypeOf(EditEntry)).call(this, props));

        _this.state = {
            friend: {},
            dirty: false
        };
        _this.params = props.params;

        // Bind event handlers.
        _this._save = _this._save.bind(_this);
        _this._delete = _this._delete.bind(_this);
        _this._onNameChange = _this._onNameChange.bind(_this);
        _this._onPhoneChange = _this._onPhoneChange.bind(_this);
        _this._onAddressChange = _this._onAddressChange.bind(_this);
        _this._onEmailChange = _this._onEmailChange.bind(_this);
        _this._onRelativeChange = _this._onRelativeChange.bind(_this);
        return _this;
    }

    /**
     * Did mount function.
     */


    _createClass(EditEntry, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (this.params.id) {
                $.blockUI();
                FriendsDAL.get(this.params.id, function (res) {
                    if (res == null) {
                        res = {
                            _id: null,
                            name: "",
                            email: "",
                            phone: "",
                            address: "",
                            relative: false
                        };
                    }
                    this.setState({ friend: res });
                    $.unblockUI();
                }.bind(this));
            }
        }

        /**
         * Render function.
         */

    }, {
        key: "render",
        value: function render() {
            // Return view.
            return React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                    "div",
                    { className: "col-md-6 col-md-offset-3 container" },
                    React.createElement(
                        "div",
                        { className: "panel panel-default panel-info" },
                        React.createElement(
                            "div",
                            { className: "panel-heading" },
                            "Edit person"
                        ),
                        React.createElement(
                            "div",
                            { className: "panel-body" },
                            React.createElement(
                                "form",
                                { role: "form", name: "myForm", onSubmit: this._save },
                                React.createElement(
                                    "div",
                                    { className: "form-group" },
                                    React.createElement(
                                        "label",
                                        null,
                                        "Full name"
                                    ),
                                    React.createElement("input", { type: "text", name: "name", required: true, className: "form-control", placeholder: "Enter full name", value: this.state.friend.name, onChange: this._onNameChange }),
                                    React.createElement(
                                        "span",
                                        _extends({ className: "label label-danger" }, this.state.dirty && this.state.friend.name == '' ? {} : { 'style': { 'display': 'none' } }),
                                        "You must enter the name"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "form-group" },
                                    React.createElement(
                                        "label",
                                        null,
                                        "Phone number"
                                    ),
                                    React.createElement("input", { type: "text", name: "phone", className: "form-control", placeholder: "Enter phone number", value: this.state.friend.phone, onChange: this._onPhoneChange })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "form-group" },
                                    React.createElement(
                                        "label",
                                        null,
                                        "Address"
                                    ),
                                    React.createElement("input", { type: "text", name: "address", className: "form-control", placeholder: "Enter address", value: this.state.friend.address, onChange: this._onAddressChange })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "form-group" },
                                    React.createElement(
                                        "label",
                                        null,
                                        "Email"
                                    ),
                                    React.createElement("input", { type: "text", name: "email", className: "form-control", placeholder: "Enter email", value: this.state.friend.email, onChange: this._onEmailChange })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "checkbox" },
                                    React.createElement(
                                        "label",
                                        null,
                                        React.createElement("input", { type: "checkbox", name: "relative", checked: this.state.friend.relative, onChange: this._onRelativeChange }),
                                        "Relative"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "row" },
                                    React.createElement(
                                        "div",
                                        { className: "col-md-4 text-center" },
                                        React.createElement(
                                            Link,
                                            { className: "btn btn-default", to: "/list" },
                                            "Cancel"
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "col-md-4 text-center" },
                                        React.createElement("input", _extends({ type: "button", className: "btn btn-default", value: "Delete", onClick: this._delete }, this.state.friend._id == null ? { disabled: true } : {}))
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "col-md-4 text-center" },
                                        React.createElement("input", _extends({ type: "submit", className: "btn btn-default", value: "Save" }, this.state.friend.name == null || this.state.friend.name == '' ? { disabled: true } : {}))
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: "_delete",
        value: function _delete() {
            // Ask for confirmation.
            if (confirm("Are you sure that you want to delete this contact?")) {
                // Block the user interface
                $.blockUI();

                // Delete contact.
                FriendsDAL.delete(this.state.friend, function () {
                    // Unblock the UI and display list of contacts.
                    $.unblockUI();
                    this.props.history.pushState(null, '/list');
                }.bind(this));
            }
        }
    }, {
        key: "_save",
        value: function _save(event) {
            // Prevent default action.
            event.preventDefault();

            // Verify that the form is valid.
            if (this.state.friend.name != null && this.state.friend.name != '') {
                // Block the user interface
                $.blockUI();

                // Save contact.
                FriendsDAL.save(this.state.friend, function () {
                    // Unblock the UI and display list of contacts.
                    $.unblockUI();
                    this.props.history.pushState(null, '/list');
                }.bind(this));
            }

            return false;
        }
    }, {
        key: "_onNameChange",
        value: function _onNameChange(event) {
            this.state.friend.name = event.target.value;this.setState({ 'friend': this.state.friend, 'dirty': true });
        }
    }, {
        key: "_onPhoneChange",
        value: function _onPhoneChange(event) {
            this.state.friend.phone = event.target.value;this.setState({ 'friend': this.state.friend });
        }
    }, {
        key: "_onAddressChange",
        value: function _onAddressChange(event) {
            this.state.friend.address = event.target.value;this.setState({ 'friend': this.state.friend });
        }
    }, {
        key: "_onEmailChange",
        value: function _onEmailChange(event) {
            this.state.friend.email = event.target.value;this.setState({ 'friend': this.state.friend });
        }
    }, {
        key: "_onRelativeChange",
        value: function _onRelativeChange(event) {
            this.state.friend.relative = !this.state.friend.relative;this.setState({ 'friend': this.state.friend });
        }
    }]);

    return EditEntry;
}(React.Component);