import React from "react";
import {Book} from "./Book";
import {Droppable, Draggable} from "react-beautiful-dnd";

export class BookshelfAdd extends React.Component {

    render() {
        const {shelfData, books} = this.props;
        console.log("Books in ADD:", books);

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfData.title}</h2>
                <div className="bookshelf-books">
                    <div className="books-grid">
                        {books.map((book) => {
                                return (
                                    <div>
                                        <Book bookData={book}/>
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