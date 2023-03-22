import axios from 'axios';

axios.defaults.baseURL = 'https://cinema-api-test.y-media.io/v1';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err)
);

export default axios;
