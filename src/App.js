import classNames from 'classnames/bind';
import styles from './App.scss';

import Header from './Componet/Header';

import { Container } from 'react-bootstrap';
import { useEffect } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route, useNavigate } from 'react-router-dom';

import { useContext } from 'react';

import { UserContext } from './Componet/context/UserContext';
import AppRoutes from './routes/AppRoutes';

import Home from './Componet/layout/Home';
import TableUsers from './Componet/TableUsers';
import Login from './Componet/layout/Login';
import { useDispatch } from 'react-redux';

import { handleRefresh } from './reudx/actions/userActions';

const cx = classNames.bind(styles);

function App() {
    // const navigate = useNavigate();
    // useEffect(() => {
    //     let token = localStorage.getItem('token');
    //     if (token) {
    //         return;
    //     }

    //     navigate('/login');
    // }, []);

    const { email, login } = useContext(UserContext);

    console.log(email);

    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            // login(localStorage.getItem('email'), localStorage.getItem('token'));
            dispatch(handleRefresh());
        }
    }, []);

    return (
        <>
            <div className={cx('app-container')}>
                <Header />
                <Container>
                    <AppRoutes />
                </Container>
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
        </>
    );
}

export default App;
