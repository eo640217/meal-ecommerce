import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Row, Col, Image, Card,ListGroup, Button, Form, FloatingLabel} from 'react-bootstrap';
import {addToCart, removeFromCart} from '../actions/cartAction'
import Message from "../components/Message";


const CartView = ({match,location,history}) => {
    const mealId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]):1
    const dispatch = useDispatch();
    useEffect(() => {
        if (mealId) {
            dispatch(addToCart(mealId,qty))
        }
    }, [dispatch,mealId,qty])
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    const removeFromCartHandler = (id) =>{
        dispatch(removeFromCart(id))
    };
    const checkoutHandler = (id) =>{
        history.push('/shipping')
    }
    
    return (
        <Row>
                <h1>Shopping Cart</h1>
            <Col sm={4}md={6} lg={8}>
                {
                cartItems.length === 0 
                ? (<Message> Cart is Empty <Link to='/'>Go Back</Link></Message>)
                : (
                    <ListGroup variant='flush' className='shadow-3'>
                    {cartItems.map(item => (
                        <ListGroup.Item key={item.meal} className='pa1'>
                            <Row className='pa2 ma2 '>
                                <Col>
                                    <Image className='w-third' src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col className='b ma2 '> 
                                    <Link className='hover-blue'to = {`/meal/${item.meal}`} >{item.name}</Link>
                                </Col>
                                <Col className='ma2'>$ {item.price}</Col>
                                <Col className=''>
                                <FloatingLabel controlId="floatingSelect" label="Qty">
                                    <Form.Select size='md' 
                                        className=''                                    
                                        as='select' 
                                        value={item.qty}
                                        onChange={(e)=>dispatch(addToCart(item.meal, Number(e.target.value)))}>                                   

                                        {[...Array(item.instock).keys()].map((x)=>(<option key={x+1} value={x+1}>{x+1}</option>))}

                                    </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col className=''>
                                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.meal)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>
                            

                            </Row>

                        </ListGroup.Item>
                    ))}
                    </ListGroup>
                )}
            </Col> 
            <Col></Col>  
            <Col sm= {1} md = {3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Subtotal ({cartItems.reduce((acc,item)=>acc+=item.qty,0)}) items </h3>
                            $
                            {cartItems
                            .reduce((acc,item)=>acc+=(item.price*item.qty),0)
                            .toFixed(2)
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                variant='dark'
                                onClick={checkoutHandler}>
                                    Checkout
                                    
                            </Button>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>    
        </Row>)
}
export default CartView