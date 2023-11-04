import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reqres.in',
});

// Can thiệp vào quá trình gửi request lên Server, can thiệp vào trình trước khi gửi request về

instance.interceptors.response.use(
    function (response) {
        return response.data ? response.data : { statusCode: response.status };
    },
    function (error) {
        let res = {};

        if (error.response) {
            res.data = error.response.data;
            res.status = error.response.status;
            res.header = error.response.header;
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        // return Promise.reject(error);
        return res;
    },
);

export default instance;
