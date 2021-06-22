import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Link, Route} from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd';


import './App.css'
import {Bookshelf} from "./components/Bookshelf";
import {BookSearch} from "./components/BookSearch";

class BooksApp extends React.Component {

    state = {
        Books: []
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState({Books: books});
            })
    }

    render() {
        console.log("State", this.state);

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
                  <DragDropContext>
                      <Bookshelf title={'Currently Reading'} books={this.state.Books} />
                      <Bookshelf title={'Wand to Read'} books={this.state.Books} />
                      <Bookshelf title={'Read'} books={this.state.Books} />
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
