import React, {useEffect}  from 'react'
import {Link} from 'react-router-dom'
import {Carousel, Col, Image, Row} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux';
import Loader from './Loader'
import Message from './Message'
import { listTopMeals, listMeals } from '../actions/mealAction'

const MealCarousel = () => {
    // const dispatch = useDispatch();
    // const mealTopRated =  useSelector(state => state.mealTopRated)
    // const {loading, error, meals} = mealTopRated

    // useEffect(() => {
    //     dispatch(listTopMeals())
    // }, [dispatch])
    const dispatch = useDispatch();
    const mealList =  useSelector(state => state.mealList);
    const {loading, error, meals} = mealList;

    
    useEffect(() => {
        dispatch(listMeals())            
    }, [dispatch])


    return (
     loading
        ? (<Loader/>) 
        : error 
        ? (<Message variant='danger'>{error}</Message>)
        : (<Carousel fade pause='hover' className='shadow bg-near-white ' variant='dark'> 
            {(meals||[]).map(meal => (
                <Carousel.Item key={meal._id}>
                <Link to={`/meal/${meal._id}`}>
                    <Image src={meal.imageCarousel} alt={meal.name} fluid />
                </Link>
                <Row sm={2}>
                <Col><h5 className='bg-near-white pa3'>{meal.name} ($ {meal.price})</h5></Col>
                <Col className='tr pa2'><h2>Meals of the Week</h2>Enjoy New Meals every Sunday!</Col>
                </Row>  
            </Carousel.Item>
            ))}
            </Carousel>)
            
    )
}

export default MealCarousel
