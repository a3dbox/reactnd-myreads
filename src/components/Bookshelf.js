import React from "react";
import {Book} from "./Book";
import {Droppable, Draggable} from "react-beautiful-dnd";

export class Bookshelf extends React.Component {

    render() {
        const {title} = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <Droppable droppableId={title}  direction="horizontal">
                    {(provided) => (
                    <div className="bookshelf-books">
                        <ol {...provided.droppableProps} ref={provided.innerRef} className="books-grid">
                            <Draggable key={"1"} draggableId={"1"} index={1}>
                                {(provided) => (
                                    <li {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                                        <Book/>
                                    </li>
                                )}
                            </Draggable>

                            <Draggable key={"2"} draggableId={"2"} index={2}>
                                {(provided) => (
                                    <li {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                                        <Book/>
                                    </li>
                                )}
                            </Draggable>

                            <Draggable key={"3"} draggableId={"3"} index={3}>
                                {(provided) => (
                                    <li {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                                        <Book/>
                                    </li>
                                )}
                            </Draggable>
                            {provided.placeholder}
                        </ol>
                    </div>

                    )}
                </Droppable>
            </div>
        );
    }
}