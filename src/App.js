import React, { Component } from 'react';
import moment from 'moment';
import Header from './components/shared/Header/Header';
import BooksList from './components/page/BooksList/BooksList';
import EditBook from './components/modals/EditBook/EditBook';
import ConfirmModal from './components/modals/ConfirmModal/ConfirmModal';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.BOOKS_URL = 'http://localhost:3004/books.json';  
    this.state = {
      books: [],
      selectedBook: null,
      openEdit: false,
      openDelete: false
    };
  }

  componentDidMount() {
    let books = [];
    fetch(this.BOOKS_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        for(var i = 0; i < jsonResponse.data.length; i++) {
          let book = jsonResponse.data[i];
          book.id = i;
          books.push(book);
        }
        this.setState({ books: books});
      });
  }

  handleEditRequestClose(newValue) {
    if(newValue) {
      let booksList = this.state.books.slice();
      console.log('before', this.state.books);
      const { author, date, name } = newValue;
      const ISODate = moment(date).toISOString();
      if(newValue.isEdit) {
        for(var i = 0; i < booksList.length; i++) {
          console.log(booksList[i], this.state.selectedBook);
          if(booksList[i].id === this.state.selectedBook.id) {
            booksList[i] = {author, date: ISODate, name, id: this.state.selectedBook.id };
          }
        }
      } else {
        const newBook = {author, date: ISODate, name, id: booksList.length};
        booksList.push(newBook);
      }
      console.log('after', booksList);
      this.setState({ books: booksList });
    }
    this.setState({ openEdit: false });
  }

  editBook(book) {
    this.setState({
      selectedBook: book
    }, () => {
      this.setState({ openEdit: true });
    });
  }

  deleteBook(id) {
    let booksList = this.state.books.filter((book) => book.id !== this.state.selectedBook.id);
    this.setState({ openDelete: false }, () => {
      this.setState({books: booksList, selectedBook: null});
    });
  }

  createBook() {
    this.setState({
      selectedBook: null
    }, () => {
      this.setState({ openEdit: true });
    });
  }

  toggleDelete(id) {
    for (var i = 0; i < this.state.books.length; i++) {
      if (id === this.state.books[i].id) {
        this.setState({ selectedBook: this.state.books[i] }, () => {
          this.setState({ openDelete: true });
        });
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Header createBook={this.createBook.bind(this)} />
        <div className="container">
          <BooksList books={this.state.books} editBook={this.editBook.bind(this)} deleteBook={this.toggleDelete.bind(this)} />
        </div>
        <EditBook
          open={this.state.open}
          onRequestClose={this.handleEditRequestClose.bind(this)}
          book={this.state.selectedBook}
        />
        <ConfirmModal
          open={this.state.openDelete}
          title={this.state.selectedBook ? `Delete ${this.state.selectedBook.name}` : 'Delete'}
          message={this.state.selectedBook ? `Are you sure you want to delete ${this.state.selectedBook.name} ?` : 'No selected book'}
          handleRequestClose={this.deleteBook.bind(this)}
        />
      </div>
    );
  }
}

export default App;
