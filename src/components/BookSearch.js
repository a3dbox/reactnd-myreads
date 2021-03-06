import React from "react";
import {Link} from "react-router-dom";
import * as BooksAPI from '../BooksAPI'

import {BookshelfAdd} from "./BookshelfAdd";

export class BookSearch extends React.Component {

    state = {
        query: '',
        results: []
    }

    updateQuery = (query) => {
        this.setState((currentState) => ({
            query: query.trim()
        }))

        this.listBooks(query);
    }

    listBooks = (query) => {
        if(query.length === 0) {
            this.setState({"results": []});
            return [];
        }

        BooksAPI.search(query)
            .then((result) => {
                let newBooks = result;
                let currentBooks = this.props.currentBooks;
                // console.log("Search Results:", newBooks);

                // Filter out all books that are already in bookshelf
                let currentBookIds = currentBooks.map((book) => (book.id));
                let newBooksFiltered = newBooks.filter( (book) => !currentBookIds.includes( book.id ) );

                if(newBooksFiltered === undefined || newBooksFiltered.length === 0) {
                    newBooksFiltered = [];
                }

                this.setState({"results": newBooksFiltered});
            })
    }

    addBook = (book) => {
        // console.log("BookSearch Add Book:", book);

        let filteredBooks = this.state.results.filter((eachBook) => {
            return eachBook.id !== book.id;
        });

        this.setState(() => ({"results": filteredBooks}));

        this.props.addBook(book);
    }

    render() {
        return <div className="search-books">
            <div className="search-books-bar">
                <Link to={"/"} className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)}/>
                </div>
            </div>
            <div className="search-books-results">
                <BookshelfAdd
                              shelfData={{title: "Results: " + this.state.query, id: "results"}}
                              books={this.state.results}
                              addBook={this.addBook}
                />
            </div>
        </div>;
    }
}