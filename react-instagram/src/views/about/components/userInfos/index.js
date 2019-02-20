import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Style from './index.module.less';
import { Icon } from 'antd';
import { followUser } from '@common/api';

@withRouter
class UserInfos extends Component {
  state = {
    topicCounts: 0,
    fansCounts: 20,
    followCounts: 100,
    avator: '',
  };

  goEditAccounts = () => {
    const { history } = this.props;
    history.push('/accounts');
  };

  attentionUser = async () => {
    await followUser({
      userId: this.props.userInfo.userId,
      status: !this.props.hasFollow ? 1 : 0
    });
    this.props.toggleFollowStatus();
  };

  render() {
    let { userInfo, isSelf, hasFollow, personalInfo } = this.props;
    if (!userInfo.username) {
      return null;
    }
    return (
      <main>
        <div className={Style['user-infos']}>
          <div className={Style['avator']} style={{ 'backgroundImage': `url(${userInfo.avatarUrl})`}}></div>
          <div className={Style['user-infos']}>
            {
              isSelf ?
              <p className={Style['operate']}>
                <span className={Style['user-account']}>{userInfo.username}</span>
                <span className={Style['modify']} onClick={this.goEditAccounts}>编辑个人主页</span>
                <Icon className={Style['icon']} type="setting" theme="filled" onClick={this.goEditAccounts}/>
              </p>
              :
              <p className={Style['operate']}>
                <span className={Style['user-account']}>{userInfo.username}</span>
                <span className={`${Style['modify']} ${!hasFollow && Style['blue']}`} onClick={this.attentionUser}>
                  {hasFollow ? '已关注' : '关注'}
                </span>
              </p>
            }

            <p className={Style['attention-status']}>
                <span><b>{personalInfo.topicCounts}</b>帖子</span>
                <span><b>{personalInfo.fansCounts}</b>粉丝</span>
                <span><b>正在关注</b>{personalInfo.followCounts}</span>
            </p>
            <p className={Style['user-name']}>
              <b>{userInfo.abstract}</b>
            </p>
          </div>
        </div>
      </main>
    );
  }
}

export default UserInfos;
