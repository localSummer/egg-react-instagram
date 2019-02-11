import fly from 'flyio';

export const getData = async () => {
  return await fly.get('/api');
};

export const postData = async (username, password, email) => {
  return await fly.post('/api/v2/login/register', {
    username,
    password,
    email
  });
};