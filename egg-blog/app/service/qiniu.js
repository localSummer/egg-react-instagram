'use strict';
const Service = require('egg').Service;
const qiniu = require('qiniu');

class QiniuService extends Service {
  async getQiniuToken() {
    const { app, ctx } = this;
    if (!app.config.qiniu.accessKey || !app.config.qiniu.secretKey || !app.config.qiniu.publicBucketDomain) {
      ctx.throw(400, '请配置七牛鉴权参数');
    }
    const mac = new qiniu.auth.digest.Mac(app.config.qiniu.accessKey, app.config.qiniu.secretKey);
    const putPolicy = new qiniu.rs.PutPolicy(app.config.qiniu.options);
    const uploadToken = putPolicy.uploadToken(mac);
    return uploadToken;
  }
}

module.exports = QiniuService;
