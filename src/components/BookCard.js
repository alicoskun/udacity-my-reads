import React from 'react';

function BookCard(props) {
  let book = props.book;
  let coverUrl = book.imageLinks ? `url("${book.imageLinks.smallThumbnail}")` : '';
  let authors = book.authors ? book.authors.join(', ') : '';
  let title = book.title;
  let shelf = book.shelf || 'none';

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{ width: 128, height: 193, backgroundImage: coverUrl }}
        />
        <div className="book-shelf-changer">
          <select
            defaultValue={shelf}
            onChange={(event) => props.onUpdateShelf(book, event.target.value)}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  );
}

export default BookCard;
