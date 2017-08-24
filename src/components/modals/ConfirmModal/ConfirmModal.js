import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const ConfirmModal = ({open, message, title, handleRequestClose}) => {
  const cancel = () => {
    handleRequestClose(false);
  };

  const confirm = () => {
    handleRequestClose(true);
  };

  return (
    <div>
      <Dialog open={open} onRequestClose={cancel}>
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel} color="primary">
            Cancel
          </Button>
          <Button onClick={confirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmModal;