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
class ListEntries extends React.Component {
    /**
     * Constructor function.
     */
    constructor(props) {
        super(props);
        this.state = {};
    }     

    /**
     * Did mount function.
     */
    componentDidMount() {
        // Subscribe to store.
        this.unsubscribe = Store.subscribe(() => {
            // Get current store state.
            var contactListState = Store.getState().contactListReducer;

            // Update component state.
            this.setState({'friends': contactListState.list});

            // Show/hide loading dialog.
            if(contactListState.loading) {
                $.blockUI();
            } else {
                $.unblockUI();
            }
        });

        // Dispatch event for load list.
        Store.dispatch(Actions.loadContacts());
    }

    /**
     * Will unmount function.
     */
    componentWillUnmount() {
        this.unsubscribe();
    }

    /**
     * Render function.
     */
    render() {
        // Parse list of friends.
        var friends_rows = [];
        this.state.friends = this.state.friends || [];
        for(var i=0; i<this.state.friends.length; i++) {
          var friend = this.state.friends[i];
          friends_rows.push(
              (<tr>
                  <td>{friend.name}</td>
                  <td>{friend.phone}</td>
                  <td>{friend.email}</td>
                  <td>{friend.address}</td> 
                  <td>
                      {friend.relative && <span className="glyphicon glyphicon-ok"></span> }
                      {!friend.relative && <span className="glyphicon glyphicon-remove"></span> }
                  </td>
                  <td>
                      <Link className="btn btn-default" to={"/edit/" + friend._id}>Edit</Link>
                  </td>
              </tr>)
          );
        }

        // Return view.
        return (
            <div>
                <div className="panel panel-success">
                    <div className="panel-heading">List of contacts</div>
                    <table className="table table-striped table-bordered text-center">
                         <thead>
                            <tr>
                               <th>Name</th>
                               <th>Phone</th>
                               <th>Address</th>
                               <th>E-mail</th>
                               <th>Relative</th>
                               <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { friends_rows }
                        </tbody>
                    </table>
                </div>
                <div className="text-right">
                    { this.state.friends.length > 0 && <span>
                        <button type="submit" className="btn btn-default" onClick={this.downloadCsv.bind(this)}>
                            <span className="glyphicon glyphicon-download"></span>
                            Download CSV
                        </button> 
                    &nbsp;</span> } 
                    <Link className="btn btn-default" to="/edit">
                        <span className="glyphicon glyphicon-plus"></span>
                        New contact
                    </Link>
                </div>
            </div>
        );
    }
    
    /**
     * Downloads the current list of friends as a CSV file.
     */
    downloadCsv() { 
        // Generate CSV date.
        var csv = '"Name","Phone","Address","Email","Relative"\n';
        for(var i=0; i<this.state.friends.length; i++) {
            csv += this._toCsvField(this.state.friends[i].name) + ',';
            csv += this._toCsvField(this.state.friends[i].phone) + ',';
            csv += this._toCsvField(this.state.friends[i].address) + ',';
            csv += this._toCsvField(this.state.friends[i].email) + ',';
            csv += this._toCsvField(this.state.friends[i].relative) + '\n';
        }

        // Generate CSV file.
        var blob = new Blob([csv], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "address_book.csv");
    }

    /**
     * Converts a value into an string suitable to be used as a field in a CSV file.
     * 
     * @param {mixed} value A value.
     * @returns {String} An string to be used in a CSV file.
     */
    _toCsvField(value) {
        // Cast to string.
        var res = value !== null && value !== undefined? value.toString() : '';

        // Replace double quotes.
        res = res.replace(new RegExp('"', 'g'), "'");

        // Add double quotes and return.
        return '"' + res + '"';
    }
}
