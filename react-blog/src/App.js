import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools'
import {getData} from './services/api';
import Nav from '@components/nav/index';

class App extends Component {
  componentDidMount() {
    getData().then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Nav /> 
        <DevTools/>
      </div>
    );
  }
}

export default App;