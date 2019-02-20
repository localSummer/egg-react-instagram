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
      validator(rule, value, callback, source, options) {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
        if (pattern.test(value)) {
          callback();
          return;
        }
        callback({ message: '密码格式不正确' });
      },
    },
  ],
};

module.exports = rule;
