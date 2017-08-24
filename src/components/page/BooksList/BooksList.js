import React, { Component } from 'react';
import './BooksList.css';
import Book from '../../shared/Book/Book';

export default class BooksList extends Component {

  renderBooks() {
    let renderedBooks = this.props.books.map((book, index) =>
      <Book book={book} key={index} editBook={this.editBook.bind(this)} deleteBook={this.deleteBook.bind(this)} />
    );
    return renderedBooks;
  }

  editBook(book) {
    this.props.editBook(book);
  }

  deleteBook(id) {
    this.props.deleteBook(id);
  }

  render() {
    return (
      <div className="books-list">
        {this.props.books.length > 0 ?
          this.renderBooks() :
          <p className="loading">Loading..</p>}
      </div>
    );
  }
}