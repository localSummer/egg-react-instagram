import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { getUserInfo, getPersonalInfo } from '@common/api';
import Nav from '../../components/nav/index';
import UserInfos from './components/userInfos/index';
import FavoriteList from './components/favoriteList/index';
import Footer from '../../components/footer/index';
import Style from './index.module.less';

@inject('rootStore')
@observer
class AboutDetail extends Component {
  state = {
    userInfo: {},
    hasFollow: false,
    isSelf: true, 
  };

  componentDidMount() {
    getUserInfo({ userId: this.props.match.params.userId ? this.props.match.params.userId : null }).then(response => {
      this.setState({
        userInfo: response.data,
      });
    }).catch(error => {
      console.log(error);
    });
    this.initBaseData();
  }

  initBaseData = () => {
    getPersonalInfo({ userId: this.props.match.params.userId ? this.props.match.params.userId : null }).then(response => {
      let { isSelf, hasFollow } = response.data;
      this.props.rootStore.dataStore.savePersonalInfo(response.data);
      this.setState({
        isSelf,
        hasFollow,
      });
    }).catch(error => {
      console.log(error);
    })
  };

  toggleFollowStatus = () => {
    this.setState({
      hasFollow: !this.state.hasFollow,
    });
  };

  render() {
    let { topic, fansCounts, followCounts } = this.props.rootStore.dataStore.personalInfo;
    let { isSelf, hasFollow, userInfo } = this.state;
    return (
      <main>
        <Nav />
        <div className="page-container">
          <div className={Style['personal-about']}>
            <UserInfos 
              isSelf={isSelf} 
              hasFollow={hasFollow} 
              toggleFollowStatus={this.toggleFollowStatus}
              userInfo={userInfo} 
              personalInfo={
                {
                  topicCounts: topic.counts,
                  fansCounts,
                  followCounts,
                }
              } />
              <FavoriteList topicList={topic.topicList}/>
              <Footer />
          </div>
        </div>
      </main>
    );
  }
}

export default AboutDetail;