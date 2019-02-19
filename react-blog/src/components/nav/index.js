import React, { Component } from 'react';
import { Menu, Dropdown, notification } from 'antd';
import { Link } from 'react-router-dom';
import Style from './index.module.less';
import { inject, observer } from 'mobx-react';
import { getUserInfo, signout } from '@common/api';
import { withRouter } from 'react-router-dom';

@inject('rootStore')
@withRouter
@observer
class Nav extends Component {
  state = {
    toggle: true,
    focusStatus: false,
    search: ''
  };

  componentDidMount() {
    if (!this.props.rootStore.dataStore.userInfo.userId) {
      getUserInfo().then(response => {
        this.props.rootStore.dataStore.saveUserInfo(response.data);
      }).catch(error => {
        console.log(error);
      });
    }
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = (event) => {
    if (!event.srcElement.scrollingElement) { return; }
    let scroll_Y = event.srcElement.scrollingElement.scrollTop;
    this.setState({
      toggle: !(scroll_Y > 58)
    });
  };

  focusSearchInput = () => {
    this.setState({
      focusStatus: !this.state.focusStatus
    });
  };

  handelChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  searchContent = (event) =>  {
    if (event.key === 'Enter') {
      console.log('search api');
    }
  }

  signOut = () => {
    signout().then(response => {
      notification.success({
        message: response.message,
      });
      this.props.history.push('/login');
    }).catch(error => {
      console.log(error);
    });
  };

  render() {
    let {focusStatus} = this.state;
    const aboutMenu = (
      <Menu>
        <Menu.Item>
          <Link to={'/about'}>关于我</Link>
        </Menu.Item>
        <Menu.Item onClick={this.signOut}>退出登录</Menu.Item>
      </Menu>
    );
    return (
      <nav className={Style['page-header']}>
        <div className={`${Style['header']} ${Style['toggle']}`}>
          <div className={Style['logo-space']}>
            <Link className={Style['instagram']} to={'/'}/>
          </div>
          <div className={Style['search']}>
            {
              focusStatus ? (
                <div className={Style['search-content']}>
                  <input type="text" className={Style['search-input']} placeholder="搜索"
                    autoFocus={focusStatus}
                    onChange={this.handelChange}
                    onBlur={this.focusSearchInput}
                    onKeyPress={this.searchContent}
                  />
                  <span className={Style['icon']}></span>
                </div>
              ) : (
                <div className={Style['search-block']} onClick={this.focusSearchInput}>
                  <span className={Style['block-icon']}></span>
                  <span className={Style['block-text']}>搜索</span>
                </div>
              )
            }
          </div>
          <div className={Style['navigate']}>
            <Link className={Style['explore']} to={'/'}/>
            <Link className={Style['love']} to={'/'} />
            <Dropdown overlay={aboutMenu}>
              <span className={Style['user']}></span>
            </Dropdown>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
