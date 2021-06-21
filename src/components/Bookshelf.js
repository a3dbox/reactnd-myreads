import React from "react";
import {Book} from "./Book";

export class Bookshelf extends React.Component {

    render() {
        const {title} = this.props;

        return <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    <li><Book/></li>
                    <li><Book/></li>
                </ol>
            </div>
        </div>;
    }
}