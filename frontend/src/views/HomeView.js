import React, {useEffect} from "react";
import {Row, Col} from 'react-bootstrap';
import Meal from "../components/Meal";
import {useDispatch,useSelector} from 'react-redux';
import {listMeals} from '../actions/mealAction';
import Message from "../components/Message";
import Loader from "../components/Loader";
import MealCarousel from "../components/MealCarousel";


const HomeView = () => {
    const dispatch = useDispatch();
    const mealList =  useSelector((state) => state.mealList);
    const {loading, error, meals} = mealList;

    useEffect(() => {
        dispatch(listMeals())            
    }, [dispatch])

    return (
        <>
            <h1 className='b shadow-5 bg-white'>Meals of the Week</h1>
            <div className=''><MealCarousel/></div>
            {
            loading
            ? <Loader/>
            : error
            ?(<Message variant='danger'>{error}</Message>)
            :<Row >
                {meals.map((meal) =>( 
                    <Col  md={4} key={meal._id}>  
                        <Meal meal={meal}/>
                    </Col>
                    ))}
            </Row>
        }
            
        </>
    );
}
export default HomeView