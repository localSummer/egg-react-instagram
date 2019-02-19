import React, { Component } from 'react';
import Style from './index.module.less';
import { inject, observer } from 'mobx-react';
import { updatePersonalInfo } from '@common/api.js'
import { Row, Col, Form, Input, Button , notification } from 'antd';
import { withRouter } from 'react-router-dom';

const FormItem = Form.Item;

@inject('rootStore')
@withRouter
@Form.create()
@observer
class ChangePassword extends Component {
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        let { newPassword, confirmPassword, password } = values
        if (newPassword !== confirmPassword ) {
          notification['error']({
            message: '新密码与确认密码不一致',
          });
          return;
        }

        let params = {
          password,
          newPassword
        }
        let response = await updatePersonalInfo(params);
        notification['success']({
          message: response.message,
        });
        this.timer = setTimeout(() => {
          this.props.history.push('/login');
        }, 1000);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let { userInfo } = this.props.rootStore.dataStore;
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
              <span className="form-item-label">旧密码</span>
            )}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入旧密码', whitespace: true }],
            })(
              <Input type="password" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={(
                <span className="form-item-label">新密码</span>
            )}
          >
            {getFieldDecorator('newPassword', {
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
                <Input type="password" />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">确定</Button>
          </FormItem>
        </Form>
      </section>
    );
  }
}

export default ChangePassword;