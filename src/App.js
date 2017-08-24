import React, { Component } from 'react';
import moment from 'moment';
import Header from './components/shared/Header/Header';
import BooksList from './components/page/BooksList/BooksList';
import EditBook from './components/modals/EditBook/EditBook';
import ConfirmModal from './components/modals/ConfirmModal/ConfirmModal';
import { nameFormatter } from './helpers';
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
    // GETting the books
    fetch(this.BOOKS_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        // As the books don't have any unique id, we're looping through them to create it
        for(var i = 0; i < jsonResponse.data.length; i++) {
          let book = jsonResponse.data[i];
          book.id = i;
          books.push(book);
        }
        this.setState({ books: books});
      });
  }

  handleEditRequestClose(newValue) {
    // Checking if we saved a book
    if(newValue) {
      // Copying the current books lists
      let booksList = this.state.books.slice();
      // Destructuring the new book values
      const { author, date, name } = newValue;

      // Formatting date for consistency between all books / db
      const ISODate = moment(date).toISOString();
      // Formatting name
      const formattedName = nameFormatter(name);

      if (newValue.isEdit) {
        for(var i = 0; i < booksList.length; i++) {
          // If we're editing, looking for the id of the edited book
          if(booksList[i].id === this.state.selectedBook.id) {
            // Replacing the book in the list with the new one
            booksList[i] = {author, date: ISODate, name: formattedName, id: this.state.selectedBook.id };
          }
        }
      } else {
        const newBook = {author, date: ISODate, name: formattedName, id: booksList.length};
        // Pushing a new book into the list
        booksList.push(newBook);
      }
      // Setting the new list as the books state
      this.setState({ books: booksList });
    }
    this.setState({ openEdit: false });
  }

  editBook(book) {
    this.setState({
      selectedBook: book
    }, () => {
      // Using callback to make sure the modal opens with the correct selected book value
      this.setState({ openEdit: true });
    });
  }

  deleteBook(id) {
    // Creating a new array without the book containing the selected book ID
    let booksList = this.state.books.filter((book) => book.id !== this.state.selectedBook.id);
    this.setState({ openDelete: false }, () => {
      this.setState({books: booksList, selectedBook: null});
    });
  }

  createBook() {
    this.setState({
      selectedBook: null
    }, () => {
      // Using callback to make sure the modal opens without old book value
      this.setState({ openEdit: true });
    });
  }

  toggleDelete(id) {
    for (var i = 0; i < this.state.books.length; i++) {
      if (id === this.state.books[i].id) {
        // Adding the book as selected book, to make its values available
        this.setState({ selectedBook: this.state.books[i] }, () => {
          this.setState({ openDelete: true });
        });
      }
    }
  }

  getBookNames() {
    return this.state.books
      .filter((book) => {
        if(this.state.selectedBook) {
          return book.id !== this.state.selectedBook.id
        }
        // If no book is selected, nothing to filter out
        return true;
      })
      .map((book) => book.name);
  }

  render() {
    return (
      <div className="App">
        <Header createBook={this.createBook.bind(this)} />
        <div className="container">
          <BooksList books={this.state.books} editBook={this.editBook.bind(this)} deleteBook={this.toggleDelete.bind(this)} />
        </div>
        <EditBook
          open={this.state.openEdit}
          onRequestClose={this.handleEditRequestClose.bind(this)}
          book={this.state.selectedBook}
          bookNames={this.getBookNames.bind(this)}
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
