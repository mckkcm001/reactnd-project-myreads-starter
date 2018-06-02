import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import Search from './Search'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {
  //state tracks books on shelves
  state = {
    books: []
  }

  // get books on shelves when component is ready
  componentDidMount() {
    BooksAPI.getAll()
    .then(books => {
      this.setState({ books })
    })
  }

  // function to change the shelf of a book
  // first the book shelf is changed and then
  // the books on the shelves are refetched and then
  // the book array in state is reset
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(BooksAPI.getAll)
    .then(books => {
        this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        {/* search page */}
        <Route path='/search' render={({ history }) => (
          <Search
            changeShelf={(book,shelf) => {
            this.changeShelf(book,shelf)
            history.push('/')
          }}/>
        )}/>
        {/* book shelves page */}
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf
                  title='Currently Reading'
                  books={this.state.books.filter(book => book.shelf === 'currentlyReading')}
                  changeShelf={this.changeShelf}
                />
                <Shelf
                  title='Want to Read'
                  books={this.state.books.filter(book => book.shelf === 'wantToRead')}
                  changeShelf={this.changeShelf}
                />
                <Shelf
                  title='Read'
                  books={this.state.books.filter(book => book.shelf === 'read')}
                  changeShelf={this.changeShelf}
                />
              </div>
            </div>
            {/* search page link */}
            <div className="open-search">
              <Link
                to='/search'
                className='open-search'
                >Add a book
              </Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
