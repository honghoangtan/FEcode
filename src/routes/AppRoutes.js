import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';

import About from '~/Component/Layout/About';
import Error from '~/Component/Layout/Error';
import Login from '~/Component/Login/Login';
import Register from '~/Component/Register/Register';
import Users from '~/Component/Users/Users';
import PrivateRoutes from './PrivateRoutes';
import Role from '~/Component/Role/Role';

function AppRoutes() {
    return (
        <div>
            <Routes>
                {/* <Route path="/project" element={<About />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/users"
                    element={
                        <PrivateRoutes>
                            <Users />
                        </PrivateRoutes>
                    }
                />
                <Route
                    path="/roles"
                    element={
                        <PrivateRoutes>
                            <Role />
                        </PrivateRoutes>
                    }
                />
                <Route path="*" element={<Error />} />
            </Routes>
        </div>
    );
}

export default AppRoutes;
