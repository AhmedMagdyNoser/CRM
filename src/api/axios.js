import axios from 'axios';

export default axios.create({
  baseURL: 'https://salespro.somee.com/api',
  timeout: 10000,
});
