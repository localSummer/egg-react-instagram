import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Style from './index.module.less';
import EditAccounts from './components/edit/index';
import ChangePassword from './components/changePassword/index';
import Nav from '@components/nav/index';
import Footer from '@components/footer/index';

@inject('rootStore')
@withRouter
@observer
class Account extends Component {
  state = {
    navList: ['编辑主页', '更改密码'],
    currIndex: 0,
  };

  changeCurrIndex = currIndex => () => {
    this.setState({
      currIndex,
    });
  };
  
  render() {
    return (
      <main>
        <Nav />
        <div className="page-container">
          <section className={Style['accounts']}>
            <nav>
              <ul className={Style['operation-list']}>
                {
                  this.state.navList.map((item, index) => {
                    return (
                      <li className={index === this.state.currIndex ? Style['active'] : ''} key={index} onClick={this.changeCurrIndex(index)}>
                        {item}
                      </li>
                    )
                  })
                }
              </ul>
            </nav>
            <section className={Style['operation-content']}>
              {
                this.state.currIndex === 0 ?
                <EditAccounts onClick={this.changeCurrIndex(0)}/>
                : 
                <ChangePassword  onClick={this.changeCurrIndex(1)}/>
              }
            </section>
          </section>
          <Footer />
        </div>
      </main>
    );
  }
}

export default Account;
