import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './App.less';

class App extends Component {
  render() {
    return (
      <div>
        <Link to="/demo">About</Link>
        {this.props.children}
      </div>
    );
  }
}

export default App;
