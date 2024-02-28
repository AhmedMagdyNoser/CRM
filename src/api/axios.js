import axios from 'axios';

export default axios.create({
  baseURL: 'http://salespro.somee.com/api',
  timeout: 10000,
});
