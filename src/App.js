import React, { Component } from 'react';
import BooksList from './components/page/BooksList/BooksList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          {/*<ActionMenu />*/}
          <h2>Books Library</h2>
        </div>
        <div className="container">
          <BooksList />
        </div>
      </div>
    );
  }
}

export default App;
