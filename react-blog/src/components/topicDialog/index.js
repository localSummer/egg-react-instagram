import React, { Component } from 'react';
import Style from './index.module.less';
import Carousel from '@components/carousel/index';
import Avatar from '@components/avatar/index';
import Comments from '@components/comments/index';
import { Icon } from 'antd';

let defaultState = {
  alertTip: '提示',
  userInfo: {
    avatarUrl: '',
    username: null,
    account: '',
    abstract: false,
    email: '',
  },
  topic: {
    index: 0,
    topicImgList: [],
    topicLike: false,
    topicLikeCounts: 20
  },
  discuss: [],
}

class TopicDialog extends Component {
  state = {
    ...defaultState,
  };

  componentWillReceiveProps(props) {
    if (props.openTopicDialog) {
      this.open(props.topicDialogOption);
    }
  }

  // 关闭弹框
  confirm = () => {
    this.props.closeDialog();
    this.stopBodyScroll(false);
  }

  // 打开弹窗
  open = (options) => {
    options = options || {};
    this.setState({
      ...defaultState,
      ...options
    });
    this.stopBodyScroll(true);
  }

  stopBodyScroll = (isFixed) => {
    let bodyEl = document.body
    let top = 0

    if (isFixed) {
        top = window.scrollY

        bodyEl.style.position = 'fixed'
        bodyEl.style.top = -top + 'px'
    } else {
        bodyEl.style.position = ''
        bodyEl.style.top = ''
        // window.scrollTo(0, top) // 回到原先的top
    }
  }

  stopBodyScroll = isFixed => {
    let bodyEl = document.body;
    let top = 0;

    if (isFixed) {
      top = window.scrollY;
      bodyEl.style.position = 'fixed';
      bodyEl.style.top = -top + 'px';
    } else {
      bodyEl.style.position = '';
      bodyEl.style.top = '';
      // window.scrollTo(0, top) // 回到原先的top
    }
  }

  // 修改评论，修改上层数据
  addCommentsFn = (...params) => {
    let newDiscuss = [...this.state.discuss, ...params];
    this.setState({
      discuss: newDiscuss,
    });
  };

  // 改变dialog数据，修改上层数据
  topicLikeFn = (...params) => {
    this.setState({
      topic: Object.assign(
        {}, 
        this.state.topic,
        ...params,
      ),
    });
  };

  render() {
    console.log(11);
    let avatarStyle = {
      width: '40px',
      height: '40px',
    };
    let { topic, topicIndex } = this.state;
    return (
      <section className={Style['topic-dialog']} style={this.props.openTopicDialog ? {display:'block'} : {display:'none'}}>
        <div className={Style['container']}>
          <Icon type="close" className={Style['close-btn']} onClick={this.confirm} />
          <article className={Style['topic']}>
            <div className={Style['carousel']}>
                <Carousel imageList={topic.topicImgList} showSlickDot={false}/>
            </div>
            <div className={Style['comment']}>
              <header>
                  <Avatar userInfo={this.state.userInfo} avatarStyle={avatarStyle}/>
              </header>

              {/* 评论区 */}
              <Comments 
                topicLikeFn={this.topicLikeFn}
                addCommentsFn={this.addCommentsFn}
                createdAt={topic.created_at}
                topicIndex={topicIndex}
                discuss={this.state.discuss} 
                topicId={topic.topicId} 
                topicLike={topic.topicLike}
                dialog={true}
                dotCounts={topic.topicLikeCounts}>
              </Comments>
            </div>
          </article>
        </div>
      </section>
    );
  }
}
 
export default TopicDialog;　