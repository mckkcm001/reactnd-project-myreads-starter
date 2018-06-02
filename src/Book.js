import React from 'react'
import PickShelf from './PickShelf'

class Book extends React.Component {
  // if book does not have an image use empty string for backgroundImage
  image = this.props.book.imageLinks ? `url(${this.props.book.imageLinks.thumbnail})` : ''

  render() {
    return (
      <li key={this.props.book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: this.image }}></div>
            <PickShelf
              book={this.props.book}
              changeShelf={this.props.changeShelf}
            />
          </div>
          <div className="book-title">{this.props.book.title || ''}</div>
          <div className="book-authors">{this.props.book.authors || ''}</div>
        </div>
      </li>
    )
  }
}

export default Book
