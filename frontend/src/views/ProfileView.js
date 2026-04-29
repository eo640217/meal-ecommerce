import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserDetails, updateUserProfile} from '../actions/userAction'


const ProfileView = ({ history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {success} = userUpdateProfile;

    useEffect(() => {
        if (!userInfo) {
            history.push('/signin');
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) setMessage('Passwords do not match');
        else dispatch(updateUserProfile({id: user._id, name, email, password}));
    }

    return (
        <Container className='page-container'>
            <Row className='g-4'>
                <Col md={4}>
                    <div className='form-card' style={{margin: 0}}>
                        <h1 style={{fontSize:'1.4rem'}}>My Profile</h1>
                        <p className='form-sub'>Update your details</p>
                        {message && <Message variant='danger'>{message}</Message>}
                        {error && <Message variant='danger'>{error}</Message>}
                        {success && <Message variant='success'>Profile updated!</Message>}
                        {loading && <Loader />}
                        <Form onSubmit={submitHandler}>
                            <Form.Group className='form-group-gap'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className='form-group-gap'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className='form-group-gap'>
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type='password' placeholder='Leave blank to keep current' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group className='form-group-gap'>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type='password' placeholder='Confirm new password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </Form.Group>
                            <div style={{marginTop: '1.5rem'}}>
                                <Button className='btn-food' type='submit'>Save Changes</Button>
                            </div>
                        </Form>
                    </div>
                </Col>
                <Col md={8}>
                    <div style={{background:'white', borderRadius:'var(--radius)', padding:'1.5rem', boxShadow:'var(--shadow-sm)'}}>
                        <h2 style={{fontSize:'1.2rem', marginBottom:'1rem'}}>My Orders</h2>
                        <p style={{color:'var(--text-muted)', fontSize:'0.9rem'}}>Order history will appear here.</p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfileView
