import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools'
import Nav from '@components/nav/index';
import { getData } from '@common/api';

class App extends Component {
  componentDidMount() {
    getData().then(response => {
      console.log(111, response);
    }).catch(error => {
      console.log(error);
    })
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