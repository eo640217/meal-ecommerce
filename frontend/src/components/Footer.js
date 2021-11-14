import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () =>{
    return (
        <footer className = 'bg-dark-gray'>
            <Container className='pa5'>  
                <Row sm={1} md={2}>      
                    <Col>        
                        <Row className='white'>About Us</Row>
                        <Row className='white'>Contact Us</Row>
                        <Row className='white'>Careers</Row>
                        <Row className='white'>Privacy</Row>
                    </Col>
                
                    <Col>
                        <Row className='white'>Help</Row>
                        <Row className='white'>Cookie Preferences</Row>
                        <Row className='white'>Terms Of Use</Row>
                        <Row className='white'>Github</Row>
                    </Col>
                
                    <Col className = 'tc white py-3'>
                        Copyright &copy; Easy Mealsy
                    </Col>
                </Row>
            </Container>
        </footer>
        )
}
export default Footer;