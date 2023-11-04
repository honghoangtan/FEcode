import { createContext, useState } from 'react';

const UserContext = createContext({ email: '', auth: false });

function UserProvider({ children }) {
    const [email, setEmail] = useState({ email: '', auth: false });

    const login = (email, token) => {
        setEmail((user) => ({
            email,
            auth: true,
        }));

        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        setEmail((user) => ({
            email: '',
            auth: false,
        }));
    };

    return <UserContext.Provider value={{ email, login, logout }}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
