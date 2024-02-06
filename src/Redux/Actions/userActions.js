import { toast } from 'react-toastify';
import { loginUser } from '~/Services/userService';

import { getUserAccount, logoutUser } from '~/Services/userService';

import { useEffect } from 'react';

export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';
// export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';

// export const USER_LOGOUT = 'USER_LOGOUT';

export const USER_REFRESH = 'USER_REFRESH';

export const USER_LOGOUT = 'USER_REFRESH';

export const handleLoginRedux = (valueLogin, password) => {
    return async (dispatch, getState) => {
        dispatch({ type: FETCH_USER_LOGIN });

        let res = await loginUser(valueLogin, password);

        console.log('>>> Check res: ', res);

        if (res && +res.EC === 0) {
            // success
            let groupWithRoles = res.DT.groupWithRoles;
            let email = res.DT.email;
            let username = res.DT.username;

            let data = {
                auth: true,
                token: 'fake token',
                account: { email, username, groupWithRoles },
            };
            const account = valueLogin;
            sessionStorage.setItem('account', JSON.stringify(data));
            sessionStorage.setItem('valueLogin', JSON.stringify(account));

            dispatch({
                type: FETCH_USER_SUCCESS,
                data: { data },
            });
        }

        // error
        if (res && res.data && +res.data.EC !== 0) {
            toast.error(res.data.EM);
        }
    };
};

export const handleLogoutRedux = () => {
    return async (dispatch, getState) => {
        let data = await logoutUser();

        if (data && +data.EC === 0) {
            toast.success('Log out success...');

            let edit = {
                auth: false,
                token: '',
                account: {},
                isLoading: false,
            };

            dispatch({
                type: USER_LOGOUT,
                data: { edit },
            });
        } else {
            toast.error(data.EM);
        }
    };
};

export const handleRefresh = () => {
    return async (dispatch, getState) => {
        let res = await getUserAccount();

        console.log('CHECK HANDLE REFRESH: ', res);

        if (res && +res.EC === 0) {
            // success
            let groupWithRoles = res.DT.groupWithRoles;
            let email = res.DT.email;
            let username = res.DT.username;

            let data = {
                auth: true,
                token: 'fake token',
                account: { email, username, groupWithRoles },
            };
            // const account = valueLogin;
            sessionStorage.setItem('account', JSON.stringify(data));
            // sessionStorage.setItem('valueLogin', JSON.stringify(account));

            dispatch({
                type: USER_REFRESH,
                data: { data },
            });
        } else {
            let data = {
                auth: false,
                token: '',
                account: {},
                isLoading: false,
            };
            dispatch({
                type: USER_REFRESH,
                data: { data },
            });
        }
    };
};
