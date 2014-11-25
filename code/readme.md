ngAddressBook
=============

Code organization
-----------------

The source code of **ngAddressBook** is distributed into four files:

 * _index.html_ which defines the application's view and gathers all the application's files.
 * _addressbook.main.js_ which contains the application's logic.
 * _addressbook.dal.js_ which is an abstraction layer between the application and the code related to PouchDB.
 * _addressboos.css_ which contains a few lines of CSS code.

Dependencies
------------

The application makes uses of the following libraries and frameworks:

 * _AngularJS_ as MVC framework.
 * _Bootstrap_ as front-end framework.
 * _PouchDB_ as database.
 * _jQuery_ since it is required by Bootstrap.
 * _Blob_ and _FileSaver_ in order to implement the downloading of files generated in the client.