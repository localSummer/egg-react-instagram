import React, { Component } from 'react';
import Style from './index.module.less';
import { notification } from 'antd';
import { inject, observer } from 'mobx-react';
import { likeTopic, addDiscuss } from '@common/api';

@inject('rootStore')
@observer
class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replyContent: '',
      topicLike: props.topicLike,
      showMoreComments: false,
    };
  }

  static defaultProps = {
    dialog: false
  };

  handelChange = (event) => {
    this.setState({replyContent: event.target.value});
  }

  showMoreComments = () => {
    this.setState({
      showMoreComments: true,
    });
  }

  focus = () => {
    this.refs.textInput.focus();
  }

  topicLike = () => {
    likeTopic({ topicId: this.props.topicId, status: this.props.topicLike ? 0 : 1 }).then(response => {
      let dotCounts = 0;
      if (response.data.status){
        dotCounts = this.props.dotCounts + 1;
      } else {
        dotCounts = this.props.dotCounts - 1 >= 0 ? this.props.dotCounts - 1 : 0;
      }
      // 更新点赞状态
      this.props.topicLikeFn({
        topicLikeCounts: dotCounts, 
        topicLike: response.data.status === 1,
        index: this.props.topicIndex,
      });
    }).catch(error => {
      console.log(error);
    });
  };

  // 添加评论
  handleKeyPress = event => {
    if (event.key === 'Enter') {
      if (!this.state.replyContent) {
        notification['error']({
            message: '请输入评论内容',
        });
        return;
      }

      addDiscuss({topicId: this.props.topicId, replyContent: this.state.replyContent}).then(response => {
        notification['success']({
          message: response.message,
        });
        // 添加评论
        this.props.addCommentsFn({
          replyContent: this.state.replyContent,
          replyName: this.props.rootStore.dataStore.userInfo.username,
          index: this.props.topicIndex,
        });
  
        // 清空评论
        this.setState({
            replyContent: '',
        });
      }).catch(error => {
        console.log(error);
      });
    }
  }

  handleCommentTime = () => {
    if (this.props.createdAt) {
      // 距离现在过去了多少秒
      let date = (new Date() - new Date(this.props.createdAt)) / 1000;
      
      // 过去了多少天
      let days = Math.floor(date / (60 * 60 * 24));
      let hours = Math.floor(date / (60 * 60));
      let minutes = Math.floor(date / 60);
      let second = Math.floor(date);

      if (days) return days + '天前';
      if (hours) return hours + '小时前';
      if (minutes) return minutes + '分钟前';
      if (second) return second + '秒前';
    }
    return '';
  }
  
  render() {
    // 定义评论列表组件
    const CommentsList = () => {
      return (
        <ul className={`${Style['comments-list']} ${this.props.dialog && Style['fill']}`}>
          {
            this.props.dialog && this.props.discuss.length === 0 ?
              <li className={Style['content']}>
                  暂时没有评论哦~
              </li>
              : ""
          }
          { 
            this.props.discuss.map((item, index) => {
                // 非弹窗展示三个,弹窗则全展示
              if (this.props.dialog || index !== 3) {
                return (
                  <li className={`${Style['content']} ${(index > 3 && !this.props.dialog) && 'hidden'} ${this.state.showMoreComments && 'no-hidden'}`} key={index}>
                    <span className={`${Style['username']} u-f-black`}>{item.replyName}</span>
                    <span className={`Style['replay-content'] u-f-black-blod`}>{item.replyContent}</span>
                  </li>
                );
              } else {
                // 显示所有部分内容
                return (
                  <div key={index}>
                    <li className={`${Style['content']} ${this.state.showMoreComments && 'no-hidden'}`}>
                      <span className={`${Style['username']} u-f-black`}>{item.replyName}</span>
                      <span className={`Style['replay-content'] u-f-black-blod`}>{item.replyContent}</span>
                    </li> 
                    {
                      this.props.discuss.length > 4 ?
                        <li className={`${Style['content']} ${Style['show-more']} u-f-lightblack2 ${this.state.showMoreComments && 'hidden'}`}>
                          <span onClick={this.showMoreComments}>显示所有</span>
                      </li>
                      : ''
                    }
                  </div>
                )
              }
            })
          }
        </ul>
      )
    }
    return (
      <div className={Style['comments-section']}>
        {
          this.props.dialog ?
            <CommentsList />
            : ''
        }
        <div className={Style['opetions']}>
          <div className="fl-left">
            <span className={`${Style['favorite']}  ${this.props.topicLike && Style['active']}`} onClick={this.topicLike}></span>
            <span className={Style['comments']} onClick={this.focus}></span>
          </div>
          <span className={`fl-right ${Style['collect']}`}></span>
        </div>
        {
          this.props.dotCounts ?
          <div className={`${Style['dot-counts']} u-f-black`}>{this.props.dotCounts}次赞</div>
          :
          <div className={`${Style['dot-counts']} u-f-black`}>抢先 点赞</div>
        }
        {/* 弹窗类型、与列表类型，评论列表位置不同 */}
        <div className={`${Style['release-time']} u-f-lightblack2`}>{this.handleCommentTime()}</div>
        {
          !this.props.dialog ?
            <CommentsList />
            : ''
        }
        <div className={Style['add-comments']}>
          <input type="text" 
            ref="textInput"
            className="u-f-black"
            placeholder="添加评论..." 
            onChange={this.handelChange} 
            value={this.state.replyContent} 
            onKeyPress={this.handleKeyPress}/>
          <span className={Style['more']}></span>
        </div>
      </div>
    );
  }
}

export default Comments;
