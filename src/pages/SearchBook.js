import React from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';

class SearchBook extends React.Component {
  render() {
    let { books, onSearchBook, onUpdateShelf, clearSearch } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search" onClick={() => clearSearch()}>
              Close
            </button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              onChange={(event) => onSearchBook(event.target.value)}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <BookCard book={book} onUpdateShelf={onUpdateShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBook;
