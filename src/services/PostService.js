/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getPosts() {
    return apiClient.get('/posts?_sort=date&_order=desc');
  },
  getPost(id) {
    return apiClient.get(`/posts?id=${id}`);
  },
  addPost(data) {
    return apiClient.post('/posts', data);
  },
  deletePost(id) {
    return apiClient.delete(`/posts/${id}`);
  },
};
