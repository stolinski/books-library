import React, { Component } from 'react';

export default class BooksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3004/books.json")
      .then((response) => response.json())
      .then((jsonResponse) => {
        this.setState({ books: jsonResponse.data });
      });
  }

  render() {
    console.log(this.state.books);
    return (
      // {this.state.books.map((book) => {
      //   <Book book={book} />
      // })}
      <div>Hey there</div>
    );
  }
}