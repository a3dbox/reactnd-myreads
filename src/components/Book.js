import React from "react";

export class Book extends React.Component {

    render() {
        const bookData = this.props.bookData;
        const addBook = this.props.addBook;
        const image = bookData.imageLinks.thumbnail;

        if(bookData.authors === undefined || bookData.authors.length === 0) {
            bookData.authors = [];
        }

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: "url(" + image + ")"
                    }}/>
                    {addBook && <div className={'book-shelf-add'} onClick={addBook} />}
                </div>
                <div className="book-title">{bookData.title}</div>
                <div className="book-authors">{bookData.authors.map((name) => (name + ", "))}</div>

            </div>
        );
    }
}