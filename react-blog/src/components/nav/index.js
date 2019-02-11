import React, { Component } from 'react';
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import Style from './index.module.less';

class Nav extends Component {
  state = {
    toggle: true,
    focusStatus: false,
    search: ''
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

  render() {
    let {focusStatus} = this.state;
    const aboutMenu = (
      <Menu>
        <Menu.Item>关于我</Menu.Item>
        <Menu.Item>退出登录</Menu.Item>
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
              <Link className={Style['user']} to={'/about'}/>
            </Dropdown>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
