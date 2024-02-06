import axios from '../axios/axios';
const createRoles = (roles) => {
    return axios
        .post('/api/v1/role/create', [...roles])
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

export { createRoles };
