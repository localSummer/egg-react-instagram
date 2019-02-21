import React, { Component } from 'react';
import Style from './index.module.less';
import { updateThirdPassInfo, getUserInfo } from '@common/api.js';
import { Row, Col, Form, Input, Button , notification } from 'antd';
import { inject, observer } from 'mobx-react';

const FormItem = Form.Item;

@inject('rootStore')
@Form.create()
@observer
class ThirdPartyUpdatePass extends Component {
  componentDidMount() {
    getUserInfo({status: 1}).then(response => {
      this.props.rootStore.dataStore.saveUserInfo(response.data);
    }).catch(error => {
      console.log(error);
    });
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        let { confirmPassword, password } = values
        if (password !== confirmPassword ) {
          notification['error']({
            message: '新密码与确认密码不一致',
          });
          return;
        }

        let params = {
          password,
        }
        let response = await updateThirdPassInfo(params);
        notification['success']({
          message: response.message,
        });
        localStorage.removeItem('token');
        this.timer = setTimeout(() => {
          this.props.history.push('/login');
        }, 1000);
      }
    });
  }

  render() {
    const { userInfo } = this.props.rootStore.dataStore;
    if (!userInfo.userId) {
      return null;
    }
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <div className={Style['third-party']}>
        <div className={`${Style['third-change-password']}`}>
          <section className={Style['edit-accounts']}>
            <Row className={Style['header']}>
              <Col span={8}>
                <span className={`${Style['avatar']} fl-right`} style = {{ 'backgroundImage': `url(${userInfo.avatarUrl})`}}></span>
              </Col>
              <Col span={16}>
                <div className={Style['username']}>{userInfo.account}</div>
              </Col>
            </Row>
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                {...formItemLayout}
                label={(
                    <span className="form-item-label">新密码</span>
                )}
              >
                {getFieldDecorator('password', {
                    rules: [{
                        required: true, message: '请输入新密码',
                    }],
                })(
                    <Input type="password" />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}    
                label={(
                    <span className="form-item-label">确定新密码</span>
                )}
              >
                {getFieldDecorator('confirmPassword', {
                    rules: [{ required: true, message: '请重新输入新密码' }],
                })(
                    <Input type="password" onPressEnter={this.handleSubmit} />
                )}
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">确定</Button>
              </FormItem>
            </Form>
          </section>
        </div>
      </div>
    )
  }
}

export default ThirdPartyUpdatePass;
