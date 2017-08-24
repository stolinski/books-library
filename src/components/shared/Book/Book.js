import React, { Component } from 'react';
import './Book.css';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import placeholder from './placeholder.jpg';

export default class Book extends Component {

  editBook() {
    this.props.editBook(this.props.book);
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
              Written by {book.author}.
            </Typography>
            <Typography component="p" className="date">
              {book.date}
            </Typography>
          </CardContent>
          <CardActions>
            <Button dense color="primary" onClick={this.editBook.bind(this)}>
              Edit
            </Button>
            <Button dense color="accent">
              Delete
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}