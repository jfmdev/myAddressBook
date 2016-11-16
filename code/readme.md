myAddressBook
=============

Code organization
-----------------

The source code of **myAddressBook** is distributed into seven files:

 * `index.html`, `list.html` and `edit.html` define the application's view.
 * `main.js`, `controllers.js` and `dal.js` contain the application's logic.
 * `main.css` contains a few lines of CSS code.

Dependencies
------------

The application makes uses of the following libraries and frameworks:

 * _AngularJS_ as MVC framework.
 * _Bootstrap_ as front-end framework.
 * _PouchDB_ as database.
 * _jQuery_ since it is required by Bootstrap.
 * _Blob_ and _FileSaver_ in order to implement the downloading of files generated in the client.