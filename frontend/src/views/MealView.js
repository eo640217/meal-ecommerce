import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {Row, Col, Image, Card,ListGroup, Button, Form, Alert} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import { listMealDetails } from "../actions/mealAction";
import Rating from '../components/Rating';
import Loader from "../components/Loader";
// import Message from "../components/Message";

const MealView = ({match, history}) => {

    const dispatch = useDispatch();
    const mealDetails =  useSelector(state => state.mealDetails);
    const {loading, err, meal} = mealDetails;
    const [qty,setQty] = useState(1);

    useEffect(() => {
        dispatch(listMealDetails(match.params.id))            
    }, [dispatch,match])

    const addToCartHandler = ()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    return (
        <>
            <Link className='btn btn-dark grow my-3 shadow-1' to ='/'>Back</Link> 
        {
            loading
            ? <Loader/> 
            : err
            ? (<Alert variant='danger'>{err}</Alert>)
            :<Row>
                <Col md={6}>
                    <Image className='shadow-1' src={meal.image} alt={meal.image}fluid/>
                </Col>

                <Col md={3} >
                    <ListGroup.Item >
                        <h2>{meal.name}</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Rating value={meal.name} text={`${meal.numReviews} Reviews`} color='#F0A500'/>
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                        <h6>Description:</h6> 
                        {meal.description}
                    </ListGroup.Item>
                    
                </Col>
                <Col md={3} >
                    <Card>
                        <ListGroup variant='flush' >
                            <ListGroup.Item>
                                <Row>
                                    <Col className='b'>Status:</Col>
                                    <Col>{meal.quantity >0? "In Stock" : "Out of Stock"}</Col>
                                </Row>  
                            </ListGroup.Item> 
                                
                            <ListGroup.Item>
                                <Row>
                                    <Col className='b'>Price:</Col>
                                    <Col>$ {meal.price}</Col>
                                </Row>
                            </ListGroup.Item> 

                            {meal.quantity > 0 && (
                                <ListGroup.Item >
                                    <Row>
                                        <Col>Quantity</Col>
                                        <Col>
                                            <Form.Control as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                                                {[...Array(meal.quantity).keys()].map(x=>(<option key={x+1} value = {x+1}>{x+1}</option>))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item> 
                            )}

                            <ListGroup.Item >
                                <Button 
                                className='btn btn-dark grow' 
                                type='button' 
                                disabled={meal.quantity === 0}
                                onClick={addToCartHandler}
                                >
                                    Add to Cart
                                </Button>
                            </ListGroup.Item> 
                        </ListGroup>
                    </Card> 
                </Col>
            </Row>
        }
    </>
    );
}
export default MealView