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

export const login = async (data) => {
  return await flyInstance.post('/login', data);
};

export const register = async (data) => {
  return await flyInstance.post('/login/register', data);
};