// import axios from 'axios';

import axios from '../axios/axios';

const registerNewUser = (email, username, password, phone) => {
    return axios.post('/api/v1/register', {
        email,
        username,
        password,
        phone,
    });
};

const loginUser = (valueLogin, password) => {
    return axios.post('/api/v1/login', {
        valueLogin,
        password,
    });
};

const fetchAllUser = (currentPage, currentLimit) => {
    return axios.get(`/api/v1/user/read?page=${currentPage}&limit=${currentLimit}`);
};

const deleteUser = (user) => {
    return axios.delete('/api/v1//user/delete', {
        data: {
            id: user.id,
        },
    });
};

const fetchGroups = () => {
    return axios.get('/api/v1/group/read');
};

const createNewUser = (userData) => {
    return axios.post('/api/v1/user/create', { ...userData });
};

const updateCurrentUser = (userData) => {
    return axios.put('/api/v1/user/update', { ...userData });
};

const getUserAccount = () => {
    return axios.get('/api/v1/account');
};

const logoutUser = () => {
    return axios.post('/api/v1/logout');
};

export {
    registerNewUser,
    loginUser,
    fetchAllUser,
    deleteUser,
    fetchGroups,
    createNewUser,
    updateCurrentUser,
    getUserAccount,
    logoutUser,
};
