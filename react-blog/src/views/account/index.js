import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Style from './index.module.less';

@inject('rootStore')
@withRouter
@observer
class Account extends Component {

  render() {
    return (
      <div>account</div>
    );
  }
}

export default Account;
