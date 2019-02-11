import React, { Component } from 'react';
import {Provider} from 'mobx-react';
import rootStore from './store/rootStore';
import {HashRouter} from 'react-router-dom';
import Routes from './router/index'; // 导入配置的路由

class Root extends Component {
  render() {
    return (
      <Provider rootStore={rootStore}>
        <HashRouter>
          <Routes/>
        </HashRouter>
      </Provider>
    );
  }
}

export default Root;
