import axios from 'axios';
axios.defaults.baseURL = 'https://cinema-api-test.y-media.io/v1';

axios.interceptors.response.use(
  res => {
    return res.data?.data
  },
  err => {
    console.log('-- AXIOS --', err)
    return Promise.reject(err.response || { statusText: err.message })
  }
);

export default axios;
