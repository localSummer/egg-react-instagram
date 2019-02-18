import React, { Component } from 'react';
import Nav from '@components/nav/index';
import PostTopic from './views/index/components/post-topic/index';
import Style from './App.module.less';
import DevTools from 'mobx-react-devtools';
import { inject, observer } from 'mobx-react';
import { friendList, friendTopicList } from '@common/api';

@inject('rootStore')
@observer
class App extends Component {
  state = {
    hasTopic: true,
    followList: [],
    showAttentionList: false,
    showPostTopic: false,
  };

  componentDidMount() {
    this.initFriendList();
    this.initTopicList();
  }

  initFriendList = () => {
    friendList().then(response => {
      let followList = response.data.map(item => {
        item.hasFollow = false;
        return item;
      });
      this.setState({
        followList,
      });
    }).catch(error => {
      console.log(error);
    })
  };

  initTopicList = () => {
    friendTopicList().then(response => {
      this.props.rootStore.dataStore.saveTopicList(response.data);
    }).catch(error => {
      console.log(error);
    });
  };

  togglePostTopic = (refresh) => {
    this.setState({
      showPostTopic: !this.state.showPostTopic,
    });
    if (refresh) {
      this.initTopicList();
    }
  };

  render() {
    let { showPostTopic } = this.state;
    return (
      <div>
        <Nav /> 
        {
          showPostTopic ? (
            <PostTopic togglePostTopic={this.togglePostTopic} />
          ) : (null)
        }
        <DevTools />
      </div>
    );
  }
}

export default App;