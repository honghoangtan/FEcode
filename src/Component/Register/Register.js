import React, { useEffect, useState } from 'react';

import './Register.scss';
import { registerNewUser } from '~/Services/userService';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const defaultValidInput = {
        isValidEmail: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
        isvalidPhone: true,
    };

    const [objectCheckInput, setObjectCheckInput] = useState(defaultValidInput);

    const invalidInput = () => {
        if (!email) {
            toast.error('Email is required');
            setObjectCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }

        let re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
            toast.error('Please enter a valid email address');
            setObjectCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }

        if (!username) {
            toast.error('User name is required');
            return false;
        }

        if (!password) {
            toast.error('Password is required');
            setObjectCheckInput({ ...defaultValidInput, isValidPassword: false });

            return false;
        }

        if (!confirmPassword) {
            toast.error('Confirm password is required');
            setObjectCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });

            return false;
        }

        if (!phone) {
            toast.error('Phone is required');
            setObjectCheckInput({ ...defaultValidInput, isvalidPhone: false });

            return false;
        }

        if (password !== confirmPassword) {
            toast.error('Confirm Password is required');
            setObjectCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });

            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        const check = invalidInput();
        if (check) {
            let response = await registerNewUser(email, username, password, phone);

            let serverData = response;

            console.log(serverData);

            if (+serverData.EC === 0) {
                toast.success(serverData.EM);
                navigate('/login');
            } else {
                toast.error(serverData.EM);
            }
        }
    };

    const handleLogin = () => {
        navigate('/login');
    };

    useEffect(() => {
        // axios.get('http://localhost:8081/api/v1/test-api').then((data) => {
        //     console.log('>>> Check data axios: ', data);
        // });
    }, []);

    return (
        <div className="register-container px-3 px-sm-0">
            <div className="container">
                <div className="row">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className="brand">Hoangtan</div>
                        <div className="detail">Everything</div>
                    </div>
                    <div className="content-right col-sm-5 col-12 py-3">
                        <div className="form">
                            <div class="mb-3">
                                <label for="exampleInputEmail" className="form-label">
                                    Emaill address
                                </label>
                                <input
                                    type="email"
                                    class={objectCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'}
                                    id="exampleInputEmail"
                                    aria-describedby="emailHelp"
                                    placeholder="Email address or phone number"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div class="mb-3">
                                <label for="exampleInputUsername" className="form-label">
                                    User name
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="exampleInputUsername"
                                    placeholder="User name"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div class="mb-3">
                                <label for="exampleInputPassword" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    class={
                                        objectCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'
                                    }
                                    id="exampleInputPassword"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div class="mb-3">
                                <label for="exampleInputConfirmPassword" className="form-label">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    class={
                                        objectCheckInput.isValidConfirmPassword
                                            ? 'form-control'
                                            : 'form-control is-invalid'
                                    }
                                    id="exampleInputConfirmPassword"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <div class="mb-3">
                                <label for="exampleInputPhoneNumber" className="form-label">
                                    Phone number
                                </label>
                                <input
                                    type="text"
                                    class={objectCheckInput.isvalidPhone ? 'form-control' : 'form-control is-invalid'}
                                    id="exampleInputPhoneNumber"
                                    placeholder="Phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary register-btn" onClick={handleRegister}>
                                Register
                            </button>

                            <hr />
                            <div className="text-center">
                                <button type="submit" class="btn btn-success" onClick={handleLogin}>
                                    Already have an account. Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
