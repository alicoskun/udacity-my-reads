import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchBook from './pages/SearchBook';
import ListMyBooks from './pages/ListMyBooks';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    booksOnShelf: [],
    searchedBooks: [],
  };

  componentDidMount() {
    this.getBooksOnShelf();
  }

  getBooksOnShelf = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        booksOnShelf: books,
      }));
    });
  };

  searchBook = (query) => {
    if (query) {
      BooksAPI.search(query).then((books) => {
        if (books.error) {
          books = [];
        } else {
          books = books.map((book) => {
            let bookOnShelf = this.state.booksOnShelf.find(
              (x) => x.id === book.id
            );

            if (bookOnShelf) {
              book.shelf = bookOnShelf.shelf;
            }

            return book;
          });
        }

        this.setState(() => ({
          searchedBooks: books,
        }));
      });
    } else {
      this.setState(() => ({
        searchedBooks: [],
      }));
    }
  };

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {
      this.getBooksOnShelf();
    });
  };

  clearSearch = () => {
    this.setState(() => ({
      searchedBooks: [],
    }));
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListMyBooks
              books={this.state.booksOnShelf}
              onUpdateShelf={(book, shelf) => {
                this.updateShelf(book, shelf);
              }}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBook
              books={this.state.searchedBooks}
              onSearchBook={(query) => {
                this.searchBook(query);
              }}
              onUpdateShelf={(book, shelf) => {
                this.updateShelf(book, shelf);
              }}
              clearSearch={this.clearSearch}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
