import React from "react";
import {Book} from "./Book";
import {Droppable, Draggable} from "react-beautiful-dnd";

export class BookshelfAdd extends React.Component {

    handleAddBook = (book) => (event) => {
        //let book = event.target.value;
        console.log("Add Book:", book);
        this.props.addBook(book);
    }

    render() {
        let {shelfData, books} = this.props;

        if(books === undefined || books.length === 0) {
            books = [];
        }

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfData.title}</h2>
                <div className="bookshelf-books">
                    <div className="books-grid">
                        {books.length > 0 && books.map((book, index) => {
                                return (
                                    <div>
                                        <Book key={index} bookData={book} addBook={this.handleAddBook(book)} />
                                    </div>
                                )
                            }
                        )
                        }
                    </div>
                </div>
            </div>
        )
    }
}