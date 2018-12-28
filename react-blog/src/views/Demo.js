import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {Button} from 'antd';

@inject('testStore')
@observer
class Demo extends Component {
  handleAdd = () => {
    this.props.testStore.changeCount(this.props.testStore.count + 1);
  };

  render() {
    return (
      <div>
        <span>{this.props.testStore.count}</span>
        <Button type="primary" onClick={this.handleAdd}>add</Button>
      </div>
    );
  }
}

export default Demo;