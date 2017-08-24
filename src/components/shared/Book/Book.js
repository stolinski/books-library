import React, { Component } from 'react';
import './Book.css';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import placeholder from './placeholder.jpg';
import moment from 'moment';

export default class Book extends Component {

  editBook() {
    this.props.editBook(this.props.book);
  }

  deleteBook() {
    this.props.deleteBook(this.props.book.id);
  }

  formatDate() {
    return moment(this.props.book.date).format('YYYY');
  }

  render() {
    const book = this.props.book;
    return (
      <div className="book">
        <Card className="card">
          <CardMedia
            className="media"
            image={placeholder}
            title={book.name} 
          />
          <CardContent>
            <Typography type="headline" component="h2">
              {book.name}
            </Typography>
            <Typography component="p">
              Written by {book.author}
            </Typography>
            <Typography component="p" className="date">
              Published in {this.formatDate()}
            </Typography>
          </CardContent>
          <CardActions>
            <Button dense color="primary" onClick={this.editBook.bind(this)}>
              Edit
            </Button>
            <Button dense color="accent" onClick={this.deleteBook.bind(this)}>
              Delete
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}