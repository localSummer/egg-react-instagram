import { baseDomain, redirectUrl } from './config';
import Fly from 'flyio/dist/npm/fly';
import { notification } from 'antd';

let fly = new Fly();

fly.config.baseURL = baseDomain;
fly.config.withCredentials = true;

fly.interceptors.response.use(function(response) {
  if (response.data.flag) {
    return Promise.resolve(response.data);
  } else {
    notification.error({
      message: response.data.message,
    });
    return Promise.reject(response.data);
  }
}, function(error) {
  console.log('error interceptors: ', error);
  try {
    notification.error({
      message: error.response.data.message || '系统异常',
    });
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      setTimeout(() => {
        window.location.href = `${redirectUrl}login`;
      }, 500);
    }
  } catch(e) {
    notification.error({
      message: '系统异常， 请稍后尝试　！',
    });
  }
  return Promise.reject({
    message: '系统异常， 请稍后尝试　！',
  });
});

export default fly;