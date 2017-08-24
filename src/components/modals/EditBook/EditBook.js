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
      isEdit: false
    };
  }

  componentWillUpdate(prevProps, prevState) {
    if (prevProps.open !== this.props.open) {
      console.log('book', this.props);
      if (this.props.book) {
        const { author, date, name } = this.props.book;
        console.log(author, date, name);
        this.setState({ author, date, name, isEdit: true });
      } else {
        this.setState({ name: '', date: new Date(), author: '', isEdit: false });
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
    return this.state.name === '' || this.state.author === '';
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
            onChange={event => this.setState({ name: event.target.value })}
            margin="normal"
            required
            error={this.state.name === ''}
            helperText={this.state.name === '' ? 'Name is required' : ''}
          />
          <TextField
            id="author"
            label="Author"
            className="modal-input"
            value={this.state.author}
            onChange={event => this.setState({ author: event.target.value })}
            margin="normal"
            error={this.state.author === ''}
            helperText={this.state.author === '' ? 'Author is required' : ''}
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