import flyInstance from './flyInstance';

export const getData = async () => {
  return await flyInstance.get('/api');
};

export const postData = async (username, password, email) => {
  return await flyInstance.post('/api/v2/login/register', {
    username,
    password,
    email
  });
};