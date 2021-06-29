import React from "react";

export class Book extends React.Component {

    render() {
        const bookData = this.props.bookData;
        const addBook = this.props.addBook;
        let noImage = false;
        let image = '';

        if(bookData.imageLinks === undefined || bookData.imageLinks.length === 0) {
            noImage = true;
        } else {
            image = bookData.imageLinks.thumbnail;
        }

        if(bookData.authors === undefined || bookData.authors.length === 0) {
            bookData.authors = [];
        }

        return (
            <div className="book">
                <div className="book-top">
                    {noImage ?
                        <div className={"book-cover-no-image"}>
                            <div className={"book-cover-no-image-text"}>No Image Available</div>
                        </div> :

                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: "url(" + image + ")"
                        }}/>
                    }
                    {addBook && <div className={'book-shelf-add'} onClick={addBook(bookData)} />}
                </div>
                <div className="book-title">{bookData.title}</div>
                <div className="book-authors">{bookData.authors.map((name) => (name + ", "))}</div>
            </div>
        );
    }
}