import React from "react";
import {Book} from "./Book";
import {Droppable, Draggable} from "react-beautiful-dnd";

export class Bookshelf extends React.Component {

    render() {
        const {title, books} = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <Droppable droppableId={title}  direction="horizontal">
                    {(provided) => (
                        <div className="bookshelf-books">
                            <ol {...provided.droppableProps} ref={provided.innerRef} className="books-grid">
                                {books.map((book, index) => {
                                    return (
                                        <Draggable key={book.id} draggableId={book.id} index={index}>
                                            {(provided) => (
                                                <li {...provided.draggableProps}
                                                    ref={provided.innerRef} {...provided.dragHandleProps}>
                                                    <Book bookData={book}/>
                                                </li>
                                            )}
                                        </Draggable>
                                    )
                                })
                                }
                                {provided.placeholder}
                            </ol>
                        </div>

                    )}
                </Droppable>
            </div>
        );
    }
}