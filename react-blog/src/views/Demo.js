import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {Button} from 'antd';

@inject('rootStore')
@observer
class Demo extends Component {
  handleAdd = () => {
    this.props.rootStore.dataStore.changeCount(this.props.rootStore.dataStore.count + 1);
  };

  render() {
    return (
      <div>
        <span>{this.props.rootStore.dataStore.count}</span>
        <Button type="primary" onClick={this.handleAdd}>add</Button>
      </div>
    );
  }
}

export default Demo;