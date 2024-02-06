import React, { useEffect, useState } from 'react';

import './Login.scss';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { loginUser } from '~/Services/userService';
import { useDispatch, useSelector } from 'react-redux';

import { handleLoginRedux } from '~/Redux/Actions/userActions';

function Login(props) {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [valueLogin, setValueLogin] = useState('');
    const [password, setPassword] = useState('');

    const defaultValidInput = {
        isValidValueLogin: true,
        isValidPassword: true,
    };

    const [objValidInput, setObjValidInput] = useState(defaultValidInput);

    const handleCreateNewAccount = () => {
        navigate('/register');
    };

    const handleLogin = async () => {
        if (!valueLogin) {
            toast.error('Please enter your email address or phone number');
            setObjValidInput({ ...defaultValidInput, isValidValueLogin: false });
            return;
        }

        if (!password) {
            toast.error('Please enter your password');
            setObjValidInput({ ...defaultValidInput, isValidPassword: false });

            return;
        }

        dispatch(handleLoginRedux(valueLogin, password));
    };

    const account = useSelector((state) => state.user.account);
    const account2 = useSelector((state) => state.user);
    const session = JSON.parse(sessionStorage.getItem('account'));

    useEffect(() => {
        console.log('>>> CHECK ACCOUNT213', account2);
        console.log('>>> CHECK ACOUNT12312321: ', account2.account);
        console.log('>>> CHECK AUTH: ', account2.auth);
        console.log('>>> CHECK SESSION: ', session);
        // if (account2.acount && account2.auth === true && session) {
        //     navigate('/users');
        // }

        if (account2 && account2.account && account2.auth === true) {
            navigate('/users');
        }
    }, [account2]);

    const handlePressEnter = (e) => {
        if (e.charCode === 13 && e.code === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="login-container px-3 px-sm-0">
            <div className="container">
                <div className="row">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className="brand">Hoangtan</div>
                        <div className="detail">Everything</div>
                    </div>
                    <div className="content-right col-sm-5 col-12 py-3">
                        <div>
                            <div className="brand mb-3 d-sm-none d-block">Hoangtan</div>
                            <div class="mb-3">
                                <input
                                    type="email"
                                    class={objValidInput.isValidValueLogin ? 'form-control' : 'form-control is-invalid'}
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Email address or phone number"
                                    value={valueLogin}
                                    onChange={(e) => setValueLogin(e.target.value)}
                                />
                            </div>
                            <div class="mb-3">
                                <input
                                    type="password"
                                    class={objValidInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                                    id="exampleInputPassword1"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={(e) => handlePressEnter(e)}
                                />
                            </div>

                            <button className="btn btn-primary login-btn" onClick={handleLogin}>
                                Login
                            </button>

                            <div className="text-center mt-3">
                                <a className="forgot-password" href="#">
                                    Forgot your password?
                                </a>
                            </div>
                            <hr />
                            <div className="text-center">
                                <button type="submit" class="btn btn-success" onClick={() => handleCreateNewAccount()}>
                                    Create New Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
