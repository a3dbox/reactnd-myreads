import React from "react";
import {Book} from "./Book";
import {Droppable, Draggable} from "react-beautiful-dnd";

export class Bookshelf extends React.Component {

    render() {
        const {shelfData, books} = this.props;

        return (
            <Droppable droppableId={shelfData.id} direction="horizontal">
                {(provided) => (
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">{shelfData.title}</h2>
                        <div className="bookshelf-books">
                            <div {...provided.droppableProps} ref={provided.innerRef} className="books-grid">
                                {books.map((book, index) => {
                                    return (
                                        <Draggable key={book.id} draggableId={book.id} index={index}>
                                            {(provided) => (
                                                <div {...provided.draggableProps}
                                                     ref={provided.innerRef} {...provided.dragHandleProps}>
                                                    <Book bookData={book}/>
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        </div>
                    </div>
                )}
            </Droppable>
        );
    }
}