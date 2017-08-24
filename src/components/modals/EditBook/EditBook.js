import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

export default class EditBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: '',
      author: ''
    };
  }

  componentWillMount() {
    if (this.props.book) {
      const { author, date, name } = this.props.book;
      this.setState({ author, date, name });
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
          />
          <TextField
            id="author"
            label="Author"
            className="modal-input"
            value={this.state.author}
            onChange={event => this.setState({ author: event.target.value })}
            margin="normal"
          />
          <TextField
            id="date"
            label="Date"
            type="date"
            className="modal-input"
            value={this.state.author}
            onChange={event => this.setState({ date: event.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel.bind(this)} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSave.bind(this)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}