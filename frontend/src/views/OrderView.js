import React, { useEffect, useState } from 'react'
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { saveShippingAddress } from '../actions/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'
import { Link } from 'react-router-dom'
import {createOrder, getOrderDetails} from '../actions/orderAction'

const OrderView = ({match}) => {
    const dispatch = useDispatch();
    const orderDetails = useSelector((state)=>state.orderDetails);
    const {order, loading,error} = orderDetails;
    const orderId = match.params.id;
    if (!loading){
        const addDecimals = (num) => {return (Math.round(num*100)/100).toFixed(2)}
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc,item) => acc+item.price *item.qty, 0));
    }
    
    
    useEffect(() =>{
        if(!order || order._id !== orderId){
            dispatch(getOrderDetails(orderId))
        }
    }, [order, orderId])


    return (
        
        loading ? <Loader/> :error ?<Message variant='danger'>{error}</Message>:
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong>{order.user.name}</p>
                            <p><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address}{' '},
                                {order.shippingAddress.city}{' '},
                                {order.shippingAddress.postalCode}{' '},
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message>:<Message variant='danger'>Not Delivered</Message>}

                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method</strong>
                                :{order.paymentMethod}{' '}
                            </p>
                            {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message>:<Message variant='danger'>Not Paid</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length == 0
                            ?<Message>Order is Empty</Message>
                            : <ListGroup variant='flush'>
                                {order.orderItems.map((item, index)=>(
                                    <ListGroup.Item>
                                        <Row>
                                            <Col >
                                                <Image className='w-20' src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col className='pa2 ma2'>
                                                <Link className='hover-light-blue' to={`/meal/${item.meal}`} fluid><h5>{item.name}</h5></Link>
                                            </Col>
                                            <Col md={4} className='bg-lightest-blue pa2 ma2'>
                                                {item.qty} x $ {item.price} = $ {item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                                </ListGroup>}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>$ {order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>$ {order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>$ {order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><h5>Total</h5></Col>
                                    <Col>$ {order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
           
            
    
    )
}


export default OrderView
