import React from 'react'

class PickShelf extends React.Component {
  // function that calls back to state in apps through chain of props
  onChangeShelf = (newshelf) => {
    this.props.changeShelf(this.props.book, newshelf.target.value)
  }

  render() {
    return (
      <div className="book-shelf-changer">
        {/* current shelf is pre-selected */}
        <select value={this.props.book.shelf || 'none'} onChange={this.onChangeShelf}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default PickShelf
