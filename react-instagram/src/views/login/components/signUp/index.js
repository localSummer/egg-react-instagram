import React, { Component } from 'react';
import { Form, Icon, Input, Button, notification } from 'antd';
import Style from './index.module.less';
import { register } from '@common/api.js';

const FormItem = Form.Item;

@Form.create()
class SignUp extends Component {
  state = {};
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        register(values).then(response => {
          notification.success({
            message: response.message,
          });
          // 切换登录状态
          this.props.toggleSign();
        }).catch(error => {
          console.log('error: ', error);
        });
      }
    });
  }

  onChangeHandler = type => event => {
    // 设置是否已输入状态,字体进行缩放
    this.setState({
      [type+'Empty']: event.target.value!== '',
    });
  }

  handleGithub = () => {
    window.location.href = 'http://127.0.0.1:7001/api/v2/passport/github';
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { emailEmpty, usernameEmpty, lockEmpty } = this.state;
    return (
      <section className={Style.signup}>
        <h1 className={Style['header']}>
          <span className={Style['instagram']}></span>
        </h1>
        <h2 className={Style['slogan']}>注册instagram分享精彩视界</h2>
        <Button type="primary" onClick={this.handleGithub} className={Style['facebook-login']}>
          使用Github登陆
        </Button>
        <div className={Style['or-line']}>
          <span className={Style['line']}></span>
          <span className={Style['name']}>或</span>
          <span className={Style['line']}></span>
        </div>
        <Form className={Style['register-form']} onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '请输入邮箱!' }],
            })(
              <div className={`${Style['form-input']} ${emailEmpty && Style['active']}`}  onChange={this.onChangeHandler('email')}>
                <label htmlFor="label-phone">邮箱</label>
                <Input id="label-phone" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} />
              </div>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <div className={`${Style['form-input']} ${usernameEmpty && Style['active']}`}  onChange={this.onChangeHandler('username')}>
                <label htmlFor="label-username">全名</label>
                <Input id="label-username" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
              </div>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <div className={`${Style['form-input']} ${lockEmpty && Style['active']}`}  onChange={this.onChangeHandler('lock')}>
                <label htmlFor="label-lock">密码</label>              
                <Input id="label-lock" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password"/>
              </div>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className={Style['register-form-button']}>
              注册
            </Button>
          </FormItem>
        </Form>
      </section>
    );
  }
}

export default SignUp;