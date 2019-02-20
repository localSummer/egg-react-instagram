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
export const getUserInfo = async (data = { userId: null}) => {
  let url = data.userId ? `/user/info?userId=${data.userId}` : '/user/info';
  return await flyInstance.get(url);
}

// 获取用户关注、发帖信息
export const getPersonalInfo = async (data = { userId: null }) => {
  let url = data.userId ? `/user/personal?userId=${data.userId}` : '/user/personal';
  return await flyInstance.get(url);
}

// 关注
export const followUser = async data => {
  return await flyInstance.post('/friend/follow', data);
}

// 未关注列表
export const friendList = async () => {
  return await flyInstance.get('/friend/unFollowUserlist');
}

// 发贴
export const addTopic = async data => {
  return await flyInstance.post('/topic/add', data);
}

// 获取七牛图片上传token
export const getToken = async () => {
  return await flyInstance.get('/handle/upload/get-token');
};

// 获取关注用户贴子列表
export const friendTopicList = async () => {
  return await flyInstance.get('/topic/friend/list');
};

// 点赞
export const likeTopic = async data => {
  return await flyInstance.post('/topic/like', data);
}

// 添加评论
export const addDiscuss = async data => {
  return await flyInstance.post('/topic/discuss/add', data);
}

// 修改密码
export const updatePersonalInfo = async data => {
  return await flyInstance.post('/user/update', data);
};

// github授权登录
export const githubLogin = async () => {
  return await flyInstance.get('/passport/github');
}