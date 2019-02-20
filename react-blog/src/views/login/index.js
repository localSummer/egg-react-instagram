/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import Style from './index.module.less';
import SignIn from './components/signIn/index.js'
import SignUp from './components/signUp/index.js'

class Login extends Component {
  state = {
    isSignUp: true,
  };

  toggleSign = () => {
    this.setState({
        isSignUp: !this.state.isSignUp,
    });
  }

  render() {
    let {isSignUp} = this.state;
    return (
      <main className={Style.login}>
        <article className={Style['login-info']}>
          <section className={Style['descript']}>
            <div className={Style['photo']}></div>
          </section>
          <section className={Style['login-dialog']}>
            {
              isSignUp?
              <SignIn />
              :<SignUp toggleSign={this.toggleSign} />
            }
            <div className={Style['toggle-ways']}>
              {
                isSignUp ? 
                  <span>没有账号？<a className={Style['notice']} onClick={this.toggleSign}>注册</a></span>
                  : 
                  <span>有账号了？<a className={Style['notice']} onClick={this.toggleSign}>请登录</a></span>
              }
            </div>
          </section>
        </article>
      </main>
    )
  }
}

export default Login;