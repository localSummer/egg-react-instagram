'use strict';

const rule = {
  email: [
    { required: true, message: '邮箱不能为空' },
    { type: 'email', message: '邮箱格式不正确' },
  ],
  password: [
    { required: true, message: '密码不能为空' },
    { type: 'string', message: '密码字段需要是字符串' },
    {
      // eslint-disable-next-line no-unused-vars
      validator(rule, value, callback, source, options) {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
        if (pattern.test(value)) {
          callback();
          return;
        }
        callback({ message: '密码最少包含一个大小写字母、数字并且为8-16位' });
      },
    },
  ],
};

module.exports = rule;
