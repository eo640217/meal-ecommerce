import React, { useEffect } from 'react'
import { Row, Col, Image, Container } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { Link } from 'react-router-dom'
import {createOrder} from '../actions/orderAction'

const PlaceOrderView = ({history}) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    cart.shippingPrice = addDecimals(cart.itemsPrice < 50 ? 20 : 0);
    cart.taxPrice = addDecimals(Number((0.13 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

    const orderCreate = useSelector(state => state.orderCreate);
    const {order, success, error} = orderCreate;

    useEffect(() => {
        if (success) history.push(`/order/${order._id}`);
        // eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            itemsPrice: cart.itemsPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    return (
        <Container className='page-container'>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row className='g-4'>
                <Col md={8}>
                    <div className='order-section'>
                        <div className='order-section-title'>Delivery Address</div>
                        <p style={{margin:0, fontSize:'0.93rem'}}>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                            {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                        </p>
                    </div>
                    <div className='order-section'>
                        <div className='order-section-title'>Payment Method</div>
                        <p style={{margin:0, fontSize:'0.93rem'}}>{cart.paymentMethod}</p>
                    </div>
                    <div className='order-section'>
                        <div className='order-section-title'>Order Items</div>
                        {cart.cartItems.length === 0 ? (
                            <Message>Your cart is empty</Message>
                        ) : (
                            cart.cartItems.map((item, index) => (
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
                        <div className='order-summary-row'><span>Items</span><span>${cart.itemsPrice}</span></div>
                        <div className='order-summary-row'><span>Shipping</span><span>${cart.shippingPrice}</span></div>
                        <div className='order-summary-row'><span>Tax (13%)</span><span>${cart.taxPrice}</span></div>
                        <div className='order-summary-row total'><span>Total</span><span>${cart.totalPrice}</span></div>
                        {error && <Message variant='danger' style={{marginTop:'0.75rem'}}>{error}</Message>}
                        <div style={{marginTop: '1.25rem'}}>
                            <button
                                className='btn-food'
                                disabled={cart.cartItems.length === 0}
                                onClick={placeOrderHandler}
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default PlaceOrderView
