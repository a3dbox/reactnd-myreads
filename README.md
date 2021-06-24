# MyReads Project

This is rendition of the final assessment project for Udacity's React Fundamentals course. 
A template was provided to save you time and included a static example of the CSS and HTML markup that may be used, but without any of the React code needed to complete the project.

The solution was improved by adding Drag and Drop capabilities to the books giving a more natural method for moving books
between the shelves.  React Beautiful DnD: (https://github.com/atlassian/react-beautiful-dnd) was used for drag and drop
and was implemented with the help of this tutorial: https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/

*Note:* The backend for this solution does not support ordering books on a bookshelf.  Dragging and dropping books in a 
new order on a shelf will be lost, but the correct books will still remain on the correct shelves if the web page is refreshed.

## TL;DR
To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Backend Server
To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`
Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`
Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`
Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).