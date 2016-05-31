ngAddressBook
=============

Code organization
-----------------

The source code of **ngAddressBook** is distributed into seven files:

 * _index.html_, _list.html_ and _edit.html_ which defines the application's view.
 * _main.js_, _controllers.js_ and _dal.js_ which contains the application's logic.
 * _main.css_ which contains a few lines of CSS code.

Dependencies
------------

The application makes uses of the following libraries and frameworks:

 * _AngularJS_ as MVC framework.
 * _Bootstrap_ as front-end framework.
 * _PouchDB_ as database.
 * _jQuery_ since it is required by Bootstrap.
 * _Blob_ and _FileSaver_ in order to implement the downloading of files generated in the client.