import React, { useEffect, useState } from 'react';
import './App.scss';

import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';

// import _ from 'lodash';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavHeader from './Component/Navigation/NavHeader';
import AppRoutes from './Routes/AppRoutes';

import { handleRefresh } from './Redux/Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function App() {
    const dispatch = useDispatch();

    const account = useSelector((state) => state.user);

    const isLoading = useSelector((state) => state.user.isLoading);

    useEffect(() => {
        // account && account.account && account.auth === true
        if (window.location.pathname !== '/' && window.location.pathname !== '/login') {
            if (sessionStorage.getItem('account')) {
                // login(localStorage.getItem('email'), localStorage.getItem('token'));
                console.log('CHECK REFRESH>>>>>>>>>>>.');
                dispatch(handleRefresh());

                console.log('>>> CHECK ACCOUNT AFTER REFRESH', account);
                console.log('>>> CHECK ACOUNT AFTER REFRESH: ', account.account);
                console.log('>>> CHECK AUTH AFTER REFRESH: ', account.auth);
            }
        }
    }, []);
    return (
        <Router>
            {/* {account && isLoading === true ? (
                <div className="loading-container">
                    <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
                </div>
            ) : (
                <>
                    <div className="app-header">
                        <Nav />
                    </div>
                    <div className="app-container">
                        <AppRoutes />
                    </div>
                </>
            )} */}

            <div className="app-header">
                <NavHeader />
            </div>
            <div className="app-container">
                <AppRoutes />
            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Router>
    );
}

export default App;
