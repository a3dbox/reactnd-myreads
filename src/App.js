import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Link, Route} from 'react-router-dom'
import {DragDropContext} from 'react-beautiful-dnd';


import './App.css'
import {Bookshelf} from "./components/Bookshelf";
import {BookSearch} from "./components/BookSearch";

class BooksApp extends React.Component {
    shelves = [
        {title: "Currently Reading", id: "currentlyReading"},
        {title: "Want to Read", id: "wantToRead"},
        {title: "Read", id: "read"}]

    state = {
        read: [],
        wantToRead: [],
        currentlyReading: []
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.shelves.forEach((shelf) => {
                    // console.log("Shelf: ", shelf);
                    let filteredBooks = books.filter((book) => book.shelf === shelf.id);
                    // console.log("Filtered Books: ", filteredBooks);

                    this.setState({[shelf.id]: {Books: filteredBooks}});
                });
            });
    }

    moveItemInList = (list, fromIndex, toIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(fromIndex, 1);
        result.splice(toIndex, 0, removed);

        return result;
    };

    moveItemToShelf = (bookIndex, fromShelf, toIndex, toShelf) => {
        const fShelfBooks = this.state[fromShelf].Books;
        const tShelfBooks = this.state[toShelf].Books;

        const removedBook = fShelfBooks.splice(bookIndex, 1);
        removedBook[0].shelf = toShelf;
        tShelfBooks.splice(toIndex, 0, removedBook[0]);

        BooksAPI.update(removedBook[0], toShelf)
            .then((response) => {
                // console.log("Update Response: ", response);

                this.setState({[fromShelf]: {Books: fShelfBooks}});
                this.setState({[toShelf]: {Books: tShelfBooks}});
            })
    }

    removeItemFromBookcase = (bookIndex, fromShelf) => {
        let books = this.state[fromShelf].Books;
        let book = books[bookIndex];

        // console.log("Remove Book:", book);

        BooksAPI.update(book, "none")
            .then((response) => {
                // console.log("Remove Response: ", response);
                let newBooks = books.filter((item) => item.id !== book.id )
                this.setState({[fromShelf]: {Books: newBooks}});
            })
    }

    handleOnDragEnd = (result) => {
        const {source, destination} = result;

        // dropped outside the list
        if (!destination) {
            this.removeItemFromBookcase(source.index, source.droppableId);
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = this.moveItemInList(
                this.state[source.droppableId].Books,
                source.index,
                destination.index
            );

            this.setState({[source.droppableId]: {Books: items}});
            return;
        } else {
            this.moveItemToShelf(source.index, source.droppableId, destination.index, destination.droppableId);
        }
    }

    addNewBook = (book) => {
        BooksAPI.update(book, "wantToRead")
            .then((response) => {
                // console.log("Add New Response", response)

                this.setState( (currentState) => {
                    return ({"wantToRead": {Books: [...currentState["wantToRead"].Books, book]}})
                });
            })
    }

    render() {
        let allBooks = [];
        allBooks = allBooks.concat(...this.shelves.map((shelf) => {
            return (
                this.state[shelf.id].Books
            );
        }));

        return (
            <div className="app">
                <Route exact path={'/search'} render={() => {
                    return (
                        <BookSearch
                            addBook={this.addNewBook}
                            currentBooks={allBooks}
                        />
                    );
                }}
                />
                <Route exact path={'/'} render={() => {
                    return (
                        <div className="list-books">
                            <div className="list-books-title">
                                <h1>My Reads</h1>
                                <p>Drag and drop books between the shelves.</p>
                                <p>Drag a book off your bookshelf to delete it.</p>
                            </div>

                            <div className="list-books-content">
                                <DragDropContext onDragEnd={this.handleOnDragEnd}>
                                    {
                                        this.shelves.map((shelf, index) => {
                                            let books = [];
                                            if (this.state[shelf.id]) {
                                                books = this.state[shelf.id].Books;
                                            }

                                            return (
                                                <Bookshelf key={index}
                                                           shelfData={shelf}
                                                           books={books}
                                                />
                                            )
                                        })
                                    }
                                </DragDropContext>
                            </div>
                            <div className="open-search">
                                <Link className='open-search-button' to={'/search'}>Add a book</Link>
                            </div>
                        </div>
                    );
                }}
                />
            </div>
        )
    }
}

export default BooksApp
