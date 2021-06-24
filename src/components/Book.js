import React from "react";

export class Book extends React.Component {

    render() {
        const bookData = this.props.bookData;
        const image = this.props.bookData.imageLinks.thumbnail;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: "url(" + image + ")"
                    }}/>

                </div>
                <div className="book-title">{bookData.title}</div>
                <div className="book-authors">{bookData.authors.map((name) => (name + ", "))}</div>
            </div>
        );
    }
}