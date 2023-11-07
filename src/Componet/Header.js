import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import logoApp from '~/assets/images/logo192.png';

import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { handleLogoutRedux } from '~/reudx/actions/userActions';

function Header(props) {
    const location = useLocation();

    const navigate = useNavigate();

    const user = useSelector((state) => state.user.account);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(handleLogoutRedux());
        // logout();
        // navigate('/login');
        // toast.success('Logout success');
    };

    useEffect(() => {
        if (user && user.auth === false && window.location.pathname !== '/login') {
            navigate('/');
            toast.success('Log out success!');
        }
    }, [user]);

    const [hideHeader, setHideHeader] = useState(true);

    // useEffect(() => {
    //     if (window.location.pathname === 'login') {
    //         setHideHeader(false);
    //     }
    // }, []);

    const a = null;
    console.log(a.abc);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={logoApp}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React bootstrap logo"
                    />
                    <span> User Management App</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {((user && user.auth) || window.location.pathname === '/') && (
                        <>
                            <Nav className="me-auto">
                                <NavLink to="/" className="nav-link">
                                    Home
                                </NavLink>

                                <NavLink to="/users" className="nav-link">
                                    Manage Users
                                </NavLink>
                            </Nav>

                            <Nav>
                                {user && user.auth === true && <span className="nav-link">Welcome {user.email} </span>}

                                <NavDropdown title="Setting" id="basic-nav-dropdown">
                                    {user && user.auth === true ? (
                                        <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                                    ) : (
                                        <NavLink to="/login" className="dropdown-item">
                                            Login
                                        </NavLink>
                                    )}

                                    {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                                </NavDropdown>
                            </Nav>
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
