import React, { Component } from 'react';
import Style from './index.module.less';
import { notification } from 'antd';
import * as qiniu from 'qiniu-js';
import { getToken } from '@common/api';

class Upload extends Component {
  static defaultProps = {
    successCb: () => {}
  };

  componentWillUnmount() {
    this.subscription && this.subscription.unsubscribe();
  }

  uploadFn = async () => {
    let response = await getToken();
    let { baseUrl, token } = response.data;
    let files = this.refs.upload.files

    // 校验图片
    if (!this.imageVerify()) return;


    let putExtra = {
      fname: "",
      params: {},
      mimeType: ["image/png", "image/jpeg", "image/gif"]
    };

    let config = {
      region: qiniu.region.z1,
    };
    
    // 文件名
    let key = new Date().getTime() + '-' + files[0].name;
    let observable = qiniu.upload(files[0], key, token, putExtra, config)

    let observer = {
      next: (res) => {
        // ...
      },
      error: (err) => {
        notification.error({
          message: err.message,
        });
      }, 
      complete: (res) => {
        let imgUrl = baseUrl + '/' + res.key;
        this.props.successCb(imgUrl);
      }
    }

    this.subscription = observable.subscribe(observer) // 上传开始
  }

  imageVerify = () => {
    let files = this.refs.upload.files
    let fileType = files[0].type;
    if (/^image/.test(fileType)) {
      return true;
    } else {
      notification.error({
          message: "请选择图片类型文件",
      });
      return false;
    }
  }

  render() {
    return (
      <input 
        ref="upload" 
        className={Style['upload-image']} 
        type="file" 
        onChange={this.uploadFn} />
    );
  }
}

export default Upload;
