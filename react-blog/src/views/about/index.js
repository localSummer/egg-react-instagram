import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('rootStore')
@observer
class AboutDetail extends Component {
  render() {
    return (
      <div>about</div>
    );
  }
}

export default AboutDetail;