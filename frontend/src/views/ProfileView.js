import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserDetails, updateUserProfile} from '../actions/userAction'
import {listMyOrders} from '../actions/orderAction'


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
    const orderListMy = useSelector(state => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

    useEffect(() => {
        if (!userInfo) {
            history.push('/signin');
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'));
                dispatch(listMyOrders());
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
                    <div className='orders-wrap'>
                        <h2>My Orders</h2>
                        {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : orders && orders.length === 0 ? (
                            <p className='orders-empty'>You haven't placed any orders yet.</p>
                        ) : (
                            <div className='orders-table-wrap'>
                                <table className='orders-table'>
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Date</th>
                                            <th>Total</th>
                                            <th>Paid</th>
                                            <th>Delivered</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders && orders.map(order => (
                                            <tr key={order._id}>
                                                <td className='td-id'>{order._id.slice(-8)}</td>
                                                <td>{order.createdAt.substring(0,10)}</td>
                                                <td className='td-price'>${order.totalPrice}</td>
                                                <td>
                                                    {order.isPaid
                                                        ? <span className='badge-paid'>{order.paidAt.substring(0,10)}</span>
                                                        : <span className='badge-unpaid'>Not paid</span>}
                                                </td>
                                                <td>
                                                    {order.isDelivered
                                                        ? <span className='badge-paid'>{order.deliveredAt.substring(0,10)}</span>
                                                        : <span className='badge-pending'>Pending</span>}
                                                </td>
                                                <td>
                                                    <Link to={`/order/${order._id}`} className='order-link'>Details →</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfileView
