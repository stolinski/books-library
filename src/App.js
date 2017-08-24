import React, { Component } from 'react';
import Header from './components/shared/Header/Header';
import BooksList from './components/page/BooksList/BooksList';
import EditBook from './components/modals/EditBook/EditBook';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      selectedBook: null,
      open: false
    };
  }

  componentDidMount() {
    fetch("http://localhost:3004/books.json")
      .then((response) => response.json())
      .then((jsonResponse) => {
        this.setState({ books: jsonResponse.data });
      });
  }

  handleRequestClose(newValue) {
    console.log(newValue);
    this.setState({open: false});
  }

  editBook(book) {
    this.setState({
      selectedBook: book,
      open: true
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <BooksList books={this.state.books} editBook={this.editBook.bind(this)} />
        </div>
        <EditBook
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          book={this.state.selectedBook}
        />
      </div>
    );
  }
}

export default App;
