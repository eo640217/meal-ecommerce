import React, {useEffect}  from 'react'
import {Link} from 'react-router-dom'
import {Carousel, Image} from 'react-bootstrap'
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
        : (<Carousel pause='hover' className='bg-dark'> 
            {(meals||[]).map(meal => (
            <Carousel.Item key={meal._id}>
                <Link to={`/meal/${meal._id}`}>
                    <Image src={meal.image} alt={meal.name} fluid />
                    <Carousel.Caption className='carousel-caption'>
                        <h2>{meal.name} ({meal.price})</h2>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>))}
            </Carousel>)
            
    )
}

export default MealCarousel