import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav} from 'react-bootstrap';
import { logout } from '../actions/userAction';

const Header = () =>{

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
    const logoutHandler = () => {
        dispatch(logout());
    }
    // useEffect(() =>{history.push(`/`)}, [history])

    return (
        <header>
            <Navbar className='shadow' collapseOnSelect expand="lg" bg="cool-gray" >
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand className='white' >MEALSY</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                        <LinkContainer to='/cart'>
                            <Nav.Link>
                                <i className='fas fa-shopping-cart'></i> Cart
                            </Nav.Link>               
                        </LinkContainer>
                        {userInfo?(
                        <NavDropdown title={userInfo.name} id='username'>
                            <LinkContainer to='/profile'>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                        </NavDropdown>
                        ):
                        <LinkContainer to='/signin'>
                            <Nav.Link>
                                <i className='fas fa-user'></i> Login
                            </Nav.Link>
                        </LinkContainer>
                    }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
        );
}
export default Header;