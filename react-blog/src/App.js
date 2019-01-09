import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools'
import { Layout } from 'antd';
import Headers from './components/headers/Headers';
import Footers from './components/footers/Footers';
import './App.less';

const {
  Content,
} = Layout;

class App extends Component {
  render() {
    return (
      <div>
        <Headers/>
        <Content className="content-wrap">
          <div className="content">
            App
          </div>
        </Content>
        <Footers/>
        <DevTools/>
      </div>
    );
  }
}

export default App;
