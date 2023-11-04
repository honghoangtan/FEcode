import { Routes, Route } from 'react-router-dom';

import Home from '~/Componet/layout/Home';
import Login from '~/Componet/layout/Login';
import TableUsers from '~/Componet/TableUsers';
import PrivateRoute from './PrivateRoute';
import NotFound from './NotFound';

function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                <Route
                    path="users"
                    element={
                        <PrivateRoute>
                            <TableUsers />
                        </PrivateRoute>
                    }
                />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default AppRoutes;
