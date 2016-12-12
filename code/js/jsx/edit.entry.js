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
class EditEntry extends React.Component {
    /**
     * Constructor function.
     */
    constructor(props) {
        super(props);
        
        // Initialize state.
        this.state = { 
            friend: {},
            dirty: false
        };
        this.params = props.params;
        
        // Bind event handlers.
        this._save = this._save.bind(this);
        this._delete = this._delete.bind(this);
        this._onNameChange = this._onNameChange.bind(this);
        this._onPhoneChange = this._onPhoneChange.bind(this);
        this._onAddressChange = this._onAddressChange.bind(this);
        this._onEmailChange = this._onEmailChange.bind(this);
        this._onRelativeChange = this._onRelativeChange.bind(this);
    }     

    /**
     * Did mount function.
     */
    componentDidMount() {
        if(this.params.id) {
            $.blockUI();
            FriendsDAL.get(this.params.id, function(res) {  
                if(res == null) {  
                    res = {
                        _id : null,
                        name : "",
                        email : "",
                        phone : "",
                        address : "",
                        relative : false
                    };
                }
                this.setState( { friend: res} );
                $.unblockUI();
            }.bind(this));
        }
    }
    
    /**
     * Render function.
     */
    render() {   
        // Return view.
        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3 container">
                    <div className="panel panel-default panel-info">
                        <div className="panel-heading">Edit person</div>
                        <div className="panel-body">
                            <form role="form" name="myForm" onSubmit={this._save}>
                                <div className="form-group">
                                    <label>Full name</label>
                                    <input type="text" name="name" required className="form-control" placeholder="Enter full name" value={this.state.friend.name} onChange={this._onNameChange} />
                                    <span className="label label-danger" {...(this.state.dirty && this.state.friend.name == '')? {} : {'style': {'display': 'none'}}} >You must enter the name</span>
                                </div>
                                <div className="form-group">
                                    <label>Phone number</label>
                                    <input type="text" name="phone" className="form-control" placeholder="Enter phone number" value={this.state.friend.phone} onChange={this._onPhoneChange} />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input type="text" name="address" className="form-control" placeholder="Enter address" value={this.state.friend.address} onChange={this._onAddressChange} />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="text" name="email" className="form-control" placeholder="Enter email" value={this.state.friend.email} onChange={this._onEmailChange} />
                                </div>
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" name="relative"  checked={this.state.friend.relative} onChange={this._onRelativeChange} />
                                        Relative
                                    </label>
                                </div>

                                <div className="row">
                                    <div className="col-md-4 text-center">
                                        <Link className="btn btn-default" to="/list">Cancel</Link>
                                    </div>
                                    <div className="col-md-4 text-center">
                                        <input type="button" className="btn btn-default" value="Delete" onClick={this._delete} {...(this.state.friend._id == null)? {disabled: true} : {}} />
                                    </div>
                                    <div className="col-md-4 text-center">
                                        <input type="submit" className="btn btn-default" value="Save"  {...(this.state.friend.name == null || this.state.friend.name == '')? {disabled: true} : {}}/>
                                    </div>
                                </div>
                            </form>
                        </div> 
                    </div> 
                </div> 
            </div>
        );
    }
    
    _delete() {
        // Ask for confirmation.
        if(confirm("Are you sure that you want to delete this contact?")) {
            // Block the user interface
            $.blockUI();

            // Delete contact.
            FriendsDAL.delete(this.state.friend, function() {
                // Unblock the UI and display list of contacts.
                $.unblockUI();
                this.props.history.pushState(null, '/list');
            }.bind(this));
        }
    }
    
    _save(event) {        
        // Prevent default action.
        event.preventDefault();

        // Verify that the form is valid.
        if(this.state.friend.name != null && this.state.friend.name != '') {
            // Block the user interface
            $.blockUI();

            // Save contact.
            FriendsDAL.save(this.state.friend, function() {
                // Unblock the UI and display list of contacts.
                $.unblockUI();
                this.props.history.pushState(null, '/list');
            }.bind(this));
        }
        
        return false;
    }
    
    _onNameChange(event) { this.state.friend.name = event.target.value; this.setState({'friend': this.state.friend, 'dirty': true}); }
    _onPhoneChange(event) { this.state.friend.phone = event.target.value; this.setState({'friend': this.state.friend}); }
    _onAddressChange(event) { this.state.friend.address = event.target.value; this.setState({'friend': this.state.friend}); }
    _onEmailChange(event) { this.state.friend.email = event.target.value; this.setState({'friend': this.state.friend}); }
    _onRelativeChange(event) { this.state.friend.relative = !this.state.friend.relative; this.setState({'friend': this.state.friend}); }
}
