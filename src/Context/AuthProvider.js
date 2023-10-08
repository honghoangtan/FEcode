import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/Config';
import { useEffect, useState } from 'react';

import { createContext } from 'react';

import { Spin } from 'antd';

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Vi day la side effect nen dua vao useEffect
        const unsub = auth.onAuthStateChanged((user) => {
            console.log({ user });
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({ displayName, email, uid, photoURL });
                setIsLoading(false);
                navigate('/');
                return;
            }
            setIsLoading(false);

            navigate('/login');
        });

        return () => {
            unsub();
        };
    }, [navigate]);

    return <AuthContext.Provider value={{ user }}>{isLoading ? <Spin /> : children}</AuthContext.Provider>;
}

export default AuthProvider;
