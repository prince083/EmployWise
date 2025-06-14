import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://reqres.in/api/',
  headers: {
    "x-api-key": "reqres-free-v1",
    "Content-Type": "application/json"
  }
});

export default instance;
