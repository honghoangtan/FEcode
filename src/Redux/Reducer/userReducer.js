import { FETCH_USER_LOGIN, FETCH_USER_SUCCESS, USER_LOGOUT, USER_REFRESH } from '../Actions/userActions';

const INITIAL_STATE = {
    account: {
        email: '',
        username: '',
        groupWithRoles: {},
    },
    auth: null,
    token: '',
    isLoading: true,
    isError: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };

        // case FETCH_USER_ERROR:
        //     return {
        //         ...state,
        //         account: {
        //             auth: false,
        //         },
        //         isLoading: false,
        //         isError: true,
        //     };

        case FETCH_USER_SUCCESS:
            console.log('>>> Check action: ', action.data);
            return {
                ...action.data.data,

                isLoading: false,
                isError: false,
            };

        case USER_REFRESH:
            return {
                ...action.data.data,
            };

        case USER_LOGOUT:
            localStorage.removeItem('email');
            localStorage.removeItem('token');
            return {
                ...action.data.edit,
            };

        // return {
        //     ...state,

        //     account: {
        //         valueLogin: JSON.parse(sessionStorage.getItem('valueLogin')),
        //         token: JSON.parse(sessionStorage.getItem('account')),
        //         auth: true,
        //     },

        // };

        default:
            return state;
    }
};

export default userReducer;
