import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Link, Route} from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd';


import './App.css'
import {Bookshelf} from "./components/Bookshelf";
import {BookSearch} from "./components/BookSearch";

class BooksApp extends React.Component {
    shelves = ["Currently Reading", "Want to Read", "Read"];

    state = {
        Books: []
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState({Books: books});
            })
    }

    handleOnDragEnd = (result) => {
        console.log(result);

        if (!result.destination) return;

        const items = Array.from(this.state.Books);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        items[result.source.index].shelf = result.destination.droppableId;
        this.setState(({Books: items}));
    }

    render() {

    return (
      <div className="app">
        <Route exact path={'/search'} render={() => {
          return (
            <BookSearch/>
          ); }}
        />
        <Route exact path={'/'} render={() => {
          return (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <DragDropContext onDragEnd={this.handleOnDragEnd}>
                      {this.shelves.map((shelf) => (
                        <Bookshelf title={shelf} books={this.state.Books.filter((book) => book.shelf.toLowerCase().replace(/\s+/g, '') === shelf.toLowerCase().replace(/\s+/g, ''))} />
                      ))}
                  </DragDropContext>
                </div>

                <div className="open-search">
                  <Link className='open-search-button' to={'/search'}>Add a book</Link>
                </div>
              </div>
            );
          }}
        />
      </div>
    )
  }
}

export default BooksApp
