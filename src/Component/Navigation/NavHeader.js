import React, { useEffect, useState } from 'react';

import './Nav.scss';

import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import logo from '../Images/react.png';

import { logoutUser } from '~/Services/userService';
import { toast } from 'react-toastify';

import { handleLogoutRedux } from '~/Redux/Actions/userActions';

function NavHeader() {
    const [isShow, setIsShow] = useState(false);

    const account = useSelector((state) => state.user);

    const location = useLocation();

    // useEffect(() => {
    //     if ((account && account.account && account.auth === true) || location.pathname === '/home') {
    //         setIsShow(true);
    //     }
    // }, [account]);
    const navigate = useNavigate();

    const account2 = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const handleLogoutUser = async () => {
        try {
            dispatch(handleLogoutRedux());
            navigate('/login');
        } catch (e) {
            console.log('>>>ERROR LOG OUT', e);
        }

        console.log('HANDLE LOG OUT ');
    };

    return (
        <>
            {((account && account.account && account.auth === true) || location.pathname === '/') && (
                // <div className="topnav">
                //     <NavLink to="/" exact>
                //         Home
                //     </NavLink>
                //     <NavLink to="/users">Users</NavLink>
                //     <NavLink to="/projects">Projects</NavLink>
                //     <NavLink to="/about">About</NavLink>
                // </div>

                <div className="nav-header">
                    <Navbar bg="header" expand="lg" className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand href="#home">
                                <img
                                    src={logo}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt="React Bootstrap logo"
                                />

                                <span className="brand-name">React-Bootstrap</span>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to="/" exact className="nav-link">
                                        Home
                                    </NavLink>

                                    {/* {account !== true && account.account !== true && account.auth !== true ? (
                                        <NavLink to="/login" className="nav-link">
                                            Users
                                        </NavLink>
                                    ) : (
                                        <NavLink to="/users" className="nav-link">
                                            Users
                                        </NavLink>
                                    )} */}

                                    <NavLink to="/users" className="nav-link">
                                        Users
                                    </NavLink>
                                    <NavLink to="/projects" className="nav-link">
                                        Projects
                                    </NavLink>

                                    <NavLink to="/roles" className="nav-link">
                                        Roles
                                    </NavLink>
                                    <NavLink to="/about" className="nav-link">
                                        About
                                    </NavLink>
                                </Nav>

                                <Nav>
                                    {account && account.account && account.auth === true ? (
                                        <>
                                            <Nav.Item className="nav-link">
                                                Wellcome {account.account.username}
                                            </Nav.Item>
                                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                                <NavDropdown.Item href="#action/3.1">Change Password</NavDropdown.Item>
                                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item>
                                                    <span onClick={() => handleLogoutUser()}>Log out</span>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </>
                                    ) : (
                                        <Link to="/login" className="nav-link">
                                            Login
                                        </Link>
                                    )}
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            )}
        </>
    );
}

export default NavHeader;
