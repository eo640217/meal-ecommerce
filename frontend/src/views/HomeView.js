import React, {useEffect} from "react";
import {Row, Col, Card} from 'react-bootstrap';
import Meal from "../components/Meal";
import {useDispatch,useSelector} from 'react-redux';
import {listMeals} from '../actions/mealAction';
import Message from "../components/Message";
import Loader from "../components/Loader";
import MealCarousel from "../components/MealCarousel";
import Landing from "../components/Landing";


const HomeView = () => {
    const dispatch = useDispatch();
    const mealList =  useSelector((state) => state.mealList);
    const {loading, error, meals} = mealList;

    useEffect(() => {
        dispatch(listMeals())            
    }, [dispatch])

    return (
        <>
        <Card className="">
            <div className=''><MealCarousel/></div>
            <Col>
            <Card className='tc'>
                <h2 className='b'>Meals of the Week</h2>            
                <p>Enjoy New Meals every Sunday!</p>        
            </Card>    
            </Col>
            
            
        </Card>
            {
            loading
            ? <Loader/>
            : error
            ?(<Message variant='danger'>{error}</Message>)
            :<>
            <Landing/>
            <Row >
                {meals.map((meal) =>( 
                    <Col  md={4} key={meal._id}>  
                        <Meal meal={meal}/>
                    </Col>
                    ))}
            </Row>
        </>
        }
            
        </>
    );
}
export default HomeView