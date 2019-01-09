import React, {Component} from 'react';
import {Layout} from 'antd';
import './footers.less';

const {Footer} = Layout;

class Footers extends Component {
  render() {
    return (
      <Footer className="blog-footers">
        Ant Design ©2018 Created by Ant UED
      </Footer>
    );
  }
}

export default Footers;