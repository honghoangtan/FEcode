import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import logoApp from '~/assets/images/logo192.png';

import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/UserContext';

function Header(props) {
    const location = useLocation();

    const navigate = useNavigate();

    const { logout, email } = useContext(UserContext);

    const handleLogout = () => {
        logout();
        navigate('/login');
        toast.success('Logout success');
    };

    const [hideHeader, setHideHeader] = useState(true);

    // useEffect(() => {
    //     if (window.location.pathname === 'login') {
    //         setHideHeader(false);
    //     }
    // }, []);

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
                    {((email && email.auth) || window.location.pathname === '/') && (
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
                                {email && email.auth === true && (
                                    <span className="nav-link">Welcome {email.email} </span>
                                )}

                                <NavDropdown title="Setting" id="basic-nav-dropdown">
                                    {email && email.auth === true ? (
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
