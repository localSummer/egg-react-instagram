import React, { Component } from 'react';
import {Provider} from 'mobx-react';
import testStore from './store/test';
import {HashRouter} from 'react-router-dom';
import App from './App';
import Routes from './router/index'; // 导入配置的路由

class Root extends Component {
  render() {
    return (
      <Provider testStore={testStore}>
        <HashRouter>
          <App>
            <Routes/>
          </App>
        </HashRouter>
      </Provider>
    );
  }
}

export default Root;
