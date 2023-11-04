// import axios from 'axios';

import axios from './customize-axios';

// promise
function fetchAllUser(page) {
    return axios.get(`/api/users?page=${page}`);
}

const postCreateUser = (name, job) => {
    return axios.post('/api/users', { name, job });
};

const putUpdateUset = (name, job) => {
    return axios.post('/api/users/2', { name, job });
};

const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`);
};

const loginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
};

export { fetchAllUser, postCreateUser, putUpdateUset, deleteUser, loginApi };
