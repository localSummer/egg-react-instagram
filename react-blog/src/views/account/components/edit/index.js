import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Input, Select, Button, AutoComplete, notification, Row, Col } from 'antd';
import { updatePersonalInfo } from '@common/api.js'
import Upload from '@components/upload/index';
import Style from './index.module.less';

const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

@inject('rootStore')
@Form.create()
@observer
class EditAccounts extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        let params = {}
        Object.keys(values).forEach((index) =>{
          if (!!values[index]) params[index] = values[index];
          if (index === 'sex' && [0, 1].includes(values[index])) {
            params[index] = values[index];
          }
        });

        let response = await updatePersonalInfo(params);
        notification['success']({
          message: response.message,
        });
        console.log('Received values of form: ', values, params);
        this.props.rootStore.dataStore.changeUserInfo(values);
      }
    });
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net', '.cn'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  changeAvatarCb = async (avatarUrl) => {
    let info = {
        avatarUrl,
    };
    let response = await updatePersonalInfo(info);
    notification.success({
        message: response.message,
    });
    this.props.rootStore.dataStore.changeAvatarUrl(avatarUrl);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

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
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));
    let { userInfo } = this.props.rootStore.dataStore; 
    return (
      <section className={Style['edit-accounts']}>
        <Row className={Style['header']}>
          <Col span={8}>
            <span className={` ${Style['avatar']} fl-right`} style={{ 'backgroundImage': `url(${userInfo.avatarUrl})`}}></span>
          </Col>
          <Col span={16}>
            <div className={Style['username']}>{userInfo.account}</div>
            <div className={Style['notice']}>更换头像<Upload successCb={this.changeAvatarCb} className={Style['notice']} /></div>
          </Col>
        </Row>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label={(
              <span className={Style['form-item-label']}>姓名</span>
            )}
          >
            {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名', whitespace: true }],
                initialValue: userInfo.username
            })(
            <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={(
              <span className={Style['form-item-label']}>网站</span>
            )}
          >
            {getFieldDecorator('website', {
                rules: [{ required: false, message: '请输个人网站' }],
                initialValue: userInfo.website, 
            })(
              <AutoComplete
              dataSource={websiteOptions}
              onChange={this.handleWebsiteChange}
              >
                <Input />
              </AutoComplete>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={(
                <span className={Style['form-item-label']}>个人简介</span>
            )}
          >
            {getFieldDecorator('abstract', {
              rules: [{
                  required: false, message: '请输入个人简介'
              }],
              initialValue: userInfo.abstract
            })(
              <TextArea placeholder="请输入个人简介" autosize={{ minRows: 2, maxRows: 6 }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={(
              <span className={Style['form-item-label']}>邮箱</span>
            )}
          >
            {getFieldDecorator('email', {
              rules: [{
                  type: 'email', message: '邮件格式不正确',
              }],
              initialValue: userInfo.email,
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={(
              <span className={Style['form-item-label']}>手机号</span>
            )}
          >
            {getFieldDecorator('mobile', {
              rules: [{ required: false, message: '请输入手机号' }],
              initialValue: userInfo.mobile
            })(
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={(
              <span className={Style['form-item-label']}>性别</span>
            )}
          >
            {getFieldDecorator('sex', {
                rules: [{ required: false, message: '请输入性别' }],
                initialValue: [0, 1].includes(userInfo.sex) ? userInfo.sex : '',
            })(
              <Select>
                <Option value={0}>男</Option>
                <Option value={1}>女</Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">更新</Button>
          </FormItem>
        </Form>
    </section>
    );
  }
}

export default EditAccounts;
