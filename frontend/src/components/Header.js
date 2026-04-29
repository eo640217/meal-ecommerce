import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { logout } from '../actions/userAction';

const Header = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const cart = useSelector(state => state.cart);
    const cartCount = cart.cartItems.reduce((acc, item) => acc + item.qty, 0);

    const logoutHandler = () => { dispatch(logout()); }

    return (
        <header>
            <Navbar className='site-nav' collapseOnSelect expand="lg">
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand className='brand-logo'>
                            🍽 MEALSY
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="nav-main" />
                    <Navbar.Collapse id="nav-main">
                        <Nav className="ms-auto align-items-center">
                            <LinkContainer to='/cart'>
                                <Nav.Link className='nav-link-item'>
                                    <i className='fas fa-shopping-bag'></i>
                                    Cart
                                    {cartCount > 0 && <span className='cart-badge'>{cartCount}</span>}
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username' className='nav-dropdown nav-link-item'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            <i className='fas fa-user me-2'></i>Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        <i className='fas fa-sign-out-alt me-2'></i>Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/signin'>
                                    <Nav.Link className='nav-link-item'>
                                        <i className='fas fa-user'></i> Login
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
export default Header;