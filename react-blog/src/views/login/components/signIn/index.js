import React, {Component} from 'react';
import { Form, Icon, Input, Button, notification } from 'antd';
import Style from './index.module.less';
import { withRouter } from 'react-router';
import { login, getUserInfo } from '@common/api';
import { inject } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

const FormItem = Form.Item;

@inject('rootStore')
@withRouter
@Form.create()
class SignIn extends Component {
  state = {};

  onChangeHandler = type => (event) => {
    this.setState({
      [type + 'Empty']: event.target.value !== '',
    });
  };

  getUserinfo = () => {
    getUserInfo().then(response => {
      this.props.rootStore.dataStore.saveUserInfo(response.data);
    }).catch(error => {
      console.log('error: ', error);
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        login(values).then(response => {
          notification.success({
            message: response.message,
          });
          // 登录成功后，获取用户基础数据
          this.getUserinfo();

          const { history } = this.props;
          setTimeout(() => {
            history.push('/');
          }, 500);
        }).catch(error => {
          console.log(error);
        });
      };
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let { emailEmpty, passwordEmpty } = this.state;
    return (
      <section className={Style['signup']}>
        <h1 className={Style['header']}>
          <span className={Style['instagram']}>
          </span>
        </h1>
        <Form className={Style['sigin-form']} onSubmit={this.handleSubmit}>
          <FormItem>
            {
              getFieldDecorator('email', {
                rules: [{required: true, message: '请输入您的邮箱'}]
              })(
                <div className={`${Style['form-input']} ${emailEmpty && Style['active']}`} onChange={this.onChangeHandler('email')}>
                  <label htmlFor="label-phone">邮箱</label>
                  <Input id="label-phone" type="email" prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>} />
                </div>
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('password', {
                rules: [{
                  required: true, message: '请输入您的密码!'
                }]
              })(
                <div className={`${Style['form-input']} ${passwordEmpty && Style['active']}`} onChange={this.onChangeHandler('password')}>
                  <label htmlFor="label-lock">密码</label>
                  <Input id="label-lock" type="password" prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} />
                </div>
              )
            }
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className={Style['register-form-button']}>登录</Button>
          </FormItem>
        </Form>
        <DevTools />
      </section>
    );
  }
}

export default SignIn;
