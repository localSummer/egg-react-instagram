import React, {Component} from 'react';
import {Layout, Menu} from 'antd';
import './headers.less';

const {Header} = Layout;

class Headers extends Component {
  render() {
    return (
      <Header className="blog-header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default Headers;