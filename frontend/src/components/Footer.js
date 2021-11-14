import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () =>{
    return (
        <footer className = 'bg-dark-gray'>
            <Container className='pa3'>        
                <Row>
                <Col className='tc white'>About Us</Col>
                <Col className='tc white'>Contact Us</Col>
                </Row>
                <Row>
                <Col className='tc white'>Help</Col>
                <Col className='tc white'>Github</Col>
                </Row>
                <Col className = 'tc white py-3'>
                    Copyright &copy; Easy Mealsy
                </Col>
            </Container>
        </footer>
        )
}
export default Footer;