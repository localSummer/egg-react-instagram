import fly from 'flyio';

export const getData = async (args) => {
  return await fly.get('/api/test');
};