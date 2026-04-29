import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className='site-footer'>
            <Container>
                <Row className='pb-3'>
                    <Col md={4} className='mb-4'>
                        <div className='footer-brand'>🍽 MEALSY</div>
                        <div className='footer-tagline'>Fresh meals delivered to your door.</div>
                    </Col>
                    <Col md={2} className='mb-4'>
                        <div className='footer-col-title'>Company</div>
                        <a href='/' className='footer-link'>About Us</a>
                        <a href='/' className='footer-link'>Careers</a>
                        <a href='/' className='footer-link'>Blog</a>
                    </Col>
                    <Col md={2} className='mb-4'>
                        <div className='footer-col-title'>Support</div>
                        <a href='/' className='footer-link'>Help Center</a>
                        <a href='/' className='footer-link'>Contact Us</a>
                        <a href='/' className='footer-link'>Cookie Preferences</a>
                    </Col>
                    <Col md={2} className='mb-4'>
                        <div className='footer-col-title'>Legal</div>
                        <a href='/' className='footer-link'>Privacy Policy</a>
                        <a href='/' className='footer-link'>Terms of Use</a>
                    </Col>
                </Row>
            </Container>
            <div className='footer-bottom'>
                <Container>
                    Copyright &copy; {new Date().getFullYear()} Easy Mealsy. All rights reserved.
                </Container>
            </div>
        </footer>
    );
}
export default Footer;