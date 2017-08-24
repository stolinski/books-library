import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import * as moment from 'moment';

export default class EditBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: new Date(),
      author: '',
      isEdit: false,
      nameError: {
        error: false,
        message: ''
      },
      authorError: {
        error: false,
        message: ''
      },
      bookNames: []
    };
  }

  componentWillUpdate(prevProps, prevState) {
    if (prevProps.open !== this.props.open) {
      console.log('book', this.props);
      const bookNames = this.props.bookNames();
      if (this.props.book) {
        const { author, date, name } = this.props.book;
        console.log(author, date, name);
        this.setState({ 
          name, 
          author, 
          date, 
          isEdit: true, 
          bookNames, 
          nameError: { error: false, message: '' },
          authorError: { error: false, message: '' }
         });
      } else {
        this.setState({
          name: '', 
          author: '', 
          date: new Date(), 
          isEdit: false, 
          bookNames, 
          nameError: { error: false, message: '' },
          authorError: { error: false, message: '' }
        });
      }
    }
  }

  getTitle() {
    return this.props.book ? 'Edit Book' : 'Create Book';
  }

  handleCancel() {
    this.props.onRequestClose();
  }

  handleSave() {
    this.props.onRequestClose(this.state);
  }

  formatDate() {
    let formattedDate = moment(this.state.date).format('YYYY-MM-DD');
    return formattedDate;
  }

  verifyForm() {
    return this.state.nameError.error || this.state.author === '';
  }

  nameChange(event) {
    const newName = event.target.value;
    let error = {
      error: false,
      message: ''
    };
    if (newName === '') {
      error = {
        error: true,
        message: 'Name is required'
      }
    } else if(this.state.bookNames.includes(newName)) {
      error = {
        error: true,
        message: 'Name is already in use'
      };
    }
    this.setState({ name: newName, nameError: error });
  }

  authorChange(event) {
    const newAuthor = event.target.value;
    let error = {
      error: false,
      message: ''
    };
    if(newAuthor === '') {
      error = {
        error: true,
        message: 'Author is required'
      };
    }
    this.setState({ author: newAuthor, authorError: error });
  }

  render() {
    return (
      <Dialog
        ignoreBackdropClick
        ignoreEscapeKeyUp
        maxWidth="xs"
        open={this.props.open}
      >
        <DialogTitle>{this.getTitle()}</DialogTitle>
        <DialogContent>
          <TextField
            id="name"
            label="Name"
            className="modal-input"
            value={this.state.name}
            onChange={this.nameChange.bind(this)}
            margin="normal"
            required
            error={this.state.nameError.error}
            helperText={this.state.nameError.message}
          />
          <TextField
            id="author"
            label="Author"
            className="modal-input"
            value={this.state.author}
            onChange={this.authorChange.bind(this)}
            margin="normal"
            required
            error={this.state.authorError.error}
            helperText={this.state.authorError.message}
          />
          <TextField
            id="date"
            label="Date"
            type="date"
            className="modal-input"
            value={this.formatDate()}
            onChange={event => this.setState({ date: event.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel.bind(this)} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSave.bind(this)} disabled={this.verifyForm()} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}