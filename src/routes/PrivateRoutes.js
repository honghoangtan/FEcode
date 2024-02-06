import { useEffect } from 'react';
import { useNavigate, redirect } from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

function PrivateRoutes({ children }) {
    const navigate = useNavigate();

    const account = useSelector((state) => state.user);

    // useEffect(() => {
    //     let session = sessionStorage.getItem('account');

    //     if (!session) {
    //         navigate('/login');
    //     }
    // }, []);

    if (account && account.account && account.auth === true) {
        return <>{children}</>;
    } else {
        return navigate('/login');
    }
}

export default PrivateRoutes;
