myAddressBook
=============

Code organization
-----------------

The source code of **myAddressBook** is distributed into seven files:

 * `index.html` defines the application's main HTML file.
 * `init.js`, `app.js`, `list.entries.js`, `edit.entry.js` and `dal.js` contain the application's logic and components.
 * `main.css` contains a few lines of CSS code.

> Nota that since the files `init.js`, `app.js`, `list.entries.js`, `edit.entry.js` were developed using _JSX_ and _ES6_, you must compile them, after any change, using _Babel_: `babel code/js/jsx --out-dir code/js`

Dependencies
------------

The application makes uses of the following libraries and frameworks:

 * _React_ & _React Router_ as MVC framework.
 * _Redux_ as state management library.
 * _Bootstrap_ as front-end framework.
 * _jQuery_ since it is required by Bootstrap.
 * _PouchDB_ as database.
 * _Blob_ and _FileSaver_ in order to implement the downloading of files generated in the client.