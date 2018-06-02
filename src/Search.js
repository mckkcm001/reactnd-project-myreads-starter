import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'

class Search extends React.Component {
  // state tracks the search query and the books
  // returned from a search
  state = {
    books: [],
    query: ''
  }

  // function to update books triggered by changing the query
  // can be a little laggy, so put in resolved variable so function
  // runs only if previous promise has resolved
  // the BooksAPI only gives shelf info for getAll and get functions
  // so have to run the search results through get to obtain
  // shelf information. If no books match, BooksAPI returns an
  // an object that causes an error, so then the books state is
  // set to an empty array
  resolved = true
  updateBooks = match => {
    if (this.resolved){
      this.resolved = false
      BooksAPI.search(match.trim())  // for multiple word entries--only keep space between words
      .then(books => {
        return Promise.all(books.map(book => {
          return BooksAPI.get(book.id)
        }))
      })
      .then( books => {
        this.setState({ books: books, query: match })
        this.resolved = true
      })
      .catch(error => {
        this.setState({ books: [], query: match})
        this.resolved = true
      })
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className='close-search'
            >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateBooks(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.books.length === 0 && this.state.query.length > 0 && (
            <div className="no-books-found">No books found!</div>
          )}
          <ol className="books-grid">
          {this.state.books !== [] && (
            this.state.books.map(book => (
              <Book
                key={book.id}
                book={book}
                changeShelf={this.props.changeShelf}
              />
            ))
          )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
