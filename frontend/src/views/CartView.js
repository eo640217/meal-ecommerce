import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Row, Col, Container} from 'react-bootstrap';
import {addToCart, removeFromCart} from '../actions/cartAction'
import Message from "../components/Message";


const CartView = ({match, location, history}) => {
    const mealId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();
    useEffect(() => {
        if (mealId) dispatch(addToCart(mealId, qty));
    }, [dispatch, mealId, qty]);

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    const removeFromCartHandler = (id) => { dispatch(removeFromCart(id)); };
    const checkoutHandler = () => { history.push('/shipping'); };
    const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <Container className='page-container'>
            <h1 className='page-title'>Shopping Cart</h1>
            <Row className='g-4'>
                <Col lg={8}>
                    {cartItems.length === 0 ? (
                        <Message>
                            Your cart is empty. <Link to='/'>Browse Menu</Link>
                        </Message>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.meal} className='cart-item'>
                                <img className='cart-item-img' src={item.image} alt={item.name} />
                                <div style={{flex: 1, minWidth: 0}}>
                                    <Link to={`/meal/${item.meal}`} className='cart-item-name d-block mb-1'>{item.name}</Link>
                                    <span className='cart-item-price'>${item.price}</span>
                                </div>
                                <select
                                    className='cart-qty-select form-select'
                                    value={item.qty}
                                    onChange={(e) => dispatch(addToCart(item.meal, Number(e.target.value)))}
                                >
                                    {[...Array(item.instock).keys()].map(x => (
                                        <option key={x+1} value={x+1}>{x+1}</option>
                                    ))}
                                </select>
                                <button className='cart-remove-btn' onClick={() => removeFromCartHandler(item.meal)}>
                                    <i className='fas fa-trash-alt'></i>
                                </button>
                            </div>
                        ))
                    )}
                </Col>
                <Col lg={4}>
                    <div className='cart-summary'>
                        <div className='cart-summary-title'>Order Summary</div>
                        <div className='cart-summary-row'>
                            <span>Items ({totalQty})</span>
                            <span>${total}</span>
                        </div>
                        <div className='cart-summary-row'>
                            <span>Delivery</span>
                            <span>{Number(total) > 50 ? <span style={{color:'var(--success)'}}>Free</span> : '$20.00'}</span>
                        </div>
                        <div className='cart-summary-row total'>
                            <span>Total</span>
                            <span>${(Number(total) + (Number(total) > 50 ? 0 : 20)).toFixed(2)}</span>
                        </div>
                        <div style={{marginTop: '1.25rem'}}>
                            <button
                                className='btn-food'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
export default CartView;

