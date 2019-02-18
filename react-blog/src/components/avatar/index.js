import React, { Component } from 'react';
import Style from './index.module.less';
import { withRouter } from 'react-router-dom';

@withRouter
class Avatar extends Component {
  static defaultProps = {
    userInfo: {
      abstract: false
    },
    avatarStyle: {
      width: '32px',
      height: '32px'
    },
    usernameStyle: {
      fontWeight: 600,
      fontSize: '14px',
      width: '140px'
    },
    abstractStyle: {
      fontSize: '14px',
      width: 'auto'
    }
  };

  goAbout = () => {
    let userId = this.props.userInfo.userId;
    try {
      let path = {
        pathname: `/about/${userId}`,
      };
      this.props.history.push(path);
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    const { userInfo } = this.props
    return (
      <div className={Style['avatar-content']}>
        <div className={Style['avatar']} onClick={this.goAbout} style={{...this.props.avatarStyle, 'backgroundImage': `url(${userInfo.avatarUrl}`}}></div>
          <div className={Style['user-abstract']}>
            <div className={`${Style['username']} ${userInfo.username && Style['clear-bg']}`} style={{...this.props.usernameStyle}}>{userInfo.username}</div>
            {/* 设置abstract默认为false，可保持背景色 */}
            <div className={`${Style['abstract']} ${userInfo.username && Style['clear-bg']}`} style={{...this.props.abstractStyle, 'display': userInfo.abstract===false || userInfo.abstract ?'inline-block':'none'}}>{userInfo.abstract}</div>
          </div>
      </div>
    );
  }
}

export default Avatar;
