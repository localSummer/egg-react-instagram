import flyInstance from './flyInstance';

export const getData = async () => {
  return await flyInstance.get('/test');
};

export const postData = async (username, password, email) => {
  return await flyInstance.post('/login/register', {
    username,
    password,
    email
  });
};

// 登录
export const login = async (data) => {
  return await flyInstance.post('/login', data);
};

// 注册
export const register = async (data) => {
  return await flyInstance.post('/login/register', data);
};

// 退出登录
export const signout = async () => {
  return flyInstance.get('/login/signout');
};

// 获取登录用户信息
export const getUserInfo = async () => {
  return await flyInstance.get('/user/info');
}