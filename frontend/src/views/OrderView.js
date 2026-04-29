import React, { useEffect } from 'react'
import { Row, Col, Image, Container } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getOrderDetails} from '../actions/orderAction'
import { Link } from 'react-router-dom'

const OrderView = ({match}) => {
    const dispatch = useDispatch();
    const orderDetails = useSelector((state) => state.orderDetails);
    const {order, loading, error} = orderDetails;
    const orderId = match.params.id;

    if (!loading && order) {
        const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    }

    useEffect(() => {
        if (!order || order._id !== orderId) dispatch(getOrderDetails(orderId));
    }, [dispatch, order, orderId])

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Container className='page-container'>
            <h1 className='page-title' style={{fontSize:'1.3rem'}}>
                Order <span style={{color:'var(--text-muted)', fontWeight:400, fontSize:'1rem'}}>#{order._id}</span>
            </h1>
            <Row className='g-4'>
                <Col md={8}>
                    <div className='order-section'>
                        <div className='order-section-title'>Delivery</div>
                        <p style={{margin:'0 0 4px', fontWeight:500}}>{order.user.name}</p>
                        <p style={{margin:'0 0 4px', fontSize:'0.88rem', color:'var(--text-muted)'}}><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p style={{margin:'0 0 8px', fontSize:'0.93rem'}}>
                            {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                        {order.isDelivered
                            ? <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            : <Message variant='danger'>Not yet delivered</Message>
                        }
                    </div>
                    <div className='order-section'>
                        <div className='order-section-title'>Payment</div>
                        <p style={{margin:'0 0 8px', fontSize:'0.93rem'}}>Method: <strong>{order.paymentMethod}</strong></p>
                        {order.isPaid
                            ? <Message variant='success'>Paid on {order.paidAt}</Message>
                            : <Message variant='danger'>Not yet paid</Message>
                        }
                    </div>
                    <div className='order-section'>
                        <div className='order-section-title'>Items</div>
                        {order.orderItems.length === 0 ? (
                            <Message>Order is empty</Message>
                        ) : (
                            order.orderItems.map((item, index) => (
                                <div key={index} className='order-item-row'>
                                    <Image src={item.image} alt={item.name} className='order-item-img' />
                                    <div style={{flex:1}}>
                                        <Link to={`/meal/${item.meal}`} style={{fontWeight:500, color:'var(--text)', fontSize:'0.93rem'}}>{item.name}</Link>
                                    </div>
                                    <span style={{fontSize:'0.9rem', color:'var(--text-muted)', whiteSpace:'nowrap'}}>
                                        {item.qty} × ${item.price} = <strong style={{color:'var(--text)'}}>${(item.qty * item.price).toFixed(2)}</strong>
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </Col>
                <Col md={4}>
                    <div className='order-summary-card'>
                        <div className='order-summary-title'>Order Summary</div>
                        <div className='order-summary-row'><span>Items</span><span>${order.itemsPrice}</span></div>
                        <div className='order-summary-row'><span>Shipping</span><span>${order.shippingPrice}</span></div>
                        <div className='order-summary-row'><span>Tax</span><span>${order.taxPrice}</span></div>
                        <div className='order-summary-row total'><span>Total</span><span>${order.totalPrice}</span></div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default OrderView
