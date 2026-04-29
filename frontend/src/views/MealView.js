import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {Row, Col, Image, Form, Button, Container} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import { listMealDetails } from "../actions/mealAction";
import Rating from '../components/Rating';
import Loader from "../components/Loader";
import Message from "../components/Message";

const MealView = ({match, history}) => {
    const dispatch = useDispatch();
    const mealDetails = useSelector(state => state.mealDetails);
    const {loading, error, meal} = mealDetails;
    const [qty, setQty] = useState(1);

    useEffect(() => {
        dispatch(listMealDetails(match.params.id))
    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <Container className='page-container'>
            <Link to='/' className='btn-back'>
                <i className='fas fa-arrow-left'></i> Back to Menu
            </Link>
            {loading ? <Loader /> : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row className='g-4'>
                    <Col md={6}>
                        <img className='product-img' src={meal.image} alt={meal.name} />
                    </Col>
                    <Col md={3}>
                        <h1 className='product-name'>{meal.name}</h1>
                        <Rating value={meal.rating} text={`${meal.numReviews} Reviews`} color='#ffc300' />
                        <div className='product-price'>${meal.price}</div>
                        <p className='product-desc'>{meal.description}</p>
                    </Col>
                    <Col md={3}>
                        <div className='purchase-card'>
                            <div className='purchase-row'>
                                <span className='text-muted'>Status</span>
                                <span className={`stock-badge ${meal.quantity > 0 ? 'in' : 'out'}`}>
                                    {meal.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                            <div className='purchase-row'>
                                <span className='text-muted'>Price</span>
                                <span style={{fontWeight: 700, color: 'var(--primary)'}}>${meal.price}</span>
                            </div>
                            {meal.quantity > 0 && (
                                <div className='purchase-row'>
                                    <span className='text-muted'>Qty</span>
                                    <Form.Control
                                        as='select'
                                        className='qty-select'
                                        value={qty}
                                        onChange={(e) => setQty(e.target.value)}
                                        style={{width: 'auto'}}
                                    >
                                        {[...Array(meal.quantity).keys()].map(x => (
                                            <option key={x+1} value={x+1}>{x+1}</option>
                                        ))}
                                    </Form.Control>
                                </div>
                            )}
                            <div style={{marginTop: '1.25rem'}}>
                                <Button
                                    className='btn-food'
                                    type='button'
                                    disabled={meal.quantity === 0}
                                    onClick={addToCartHandler}
                                >
                                    <i className='fas fa-shopping-bag me-2'></i>Add to Cart
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            )}
        </Container>
    );
}
export default MealView;