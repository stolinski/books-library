import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Add from 'material-ui-icons/Add';
import './Header.css';

const Header = ({createBook}) => {

  return (
    <div className="header">
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit" className="title">
            Books Library
          </Typography>
          <Button color="contrast" className="add-button" onClick={createBook}><Add /> <span>Add</span></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;