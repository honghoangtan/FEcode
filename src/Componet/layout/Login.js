import { faArrowLeft, faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { loginApi } from '~/services/UserService';

import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');

    const [isShowPassWord, setIsShowPassWord] = useState(false);

    const [loadingApi, setLoadingApi] = useState(false);

    // check dieu kien o app
    // useEffect(() => {
    //     let token = localStorage.getItem('token');

    //     if (token) {
    //         navigate('/');
    //     }
    // }, []);

    const { user, login } = useContext(UserContext);

    const handleChange = (e) => {
        const emailValue = e.target.value;

        if (!emailValue.startsWith(' ')) {
            setEmail(emailValue);
        }
    };

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Email/Password is required!');
            return;
        }

        setLoadingApi(true);
        let res = await loginApi('charles.morris@reqres.in', password);

        console.log('>>> Check res: ', res);

        if (res && res.token) {
            const token = JSON.stringify(res.token);
            login(email, token);
            navigate('/');
        } else {
            // error
            if (res && res.status === 400) {
                toast.error(res.data.error);
            }
            setLoadingApi(false);
        }
    };

    const handlePressEnter = (e) => {
        if (e && e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="login-container col-12 col-sm-4">
            <div className="title">Login</div>
            <div className="text">Email of username</div>

            <input placeholder="Email or username" value={email} onChange={handleChange} />

            <div className="input-2">
                <input
                    type={isShowPassWord === true ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassWord(e.target.value)}
                    onKeyDown={handlePressEnter}
                />
                <FontAwesomeIcon
                    className="eye-icon"
                    icon={isShowPassWord === true ? faEye : faEyeSlash}
                    onClick={() => setIsShowPassWord(!isShowPassWord)}
                />
                {/* <FontAwesomeIcon className="eye-icon" icon={faEye} /> */}
            </div>

            <button
                className={email && password ? 'button active' : 'button'}
                disabled={email && password ? false : true}
                onClick={() => handleLogin()}
            >
                {/* <i class="fas fa-circle-notch fa-spin"></i> */}
                {loadingApi && <FontAwesomeIcon icon={faSpinner} className="fa-spin" />}
                &nbsp; Login
            </button>

            <div className="back">
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>Go back</span>
            </div>
        </div>
    );
}

export default Login;
