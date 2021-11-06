import React, {useEffect} from "react";
import {Row, Col, Alert, Container} from 'react-bootstrap';
import Meal from "../components/Meal";
import {useDispatch,useSelector} from 'react-redux';
import {listMeals} from '../actions/mealAction';
// import Message from "../components/Message.js";
import Loader from "../components/Loader";
import MealCarousel from "../components/MealCarousel";


const HomeView = () => {
    const dispatch = useDispatch();
    const mealList =  useSelector(state => state.mealList);
    const {loading, err, meals} = mealList;

    
    useEffect(() => {
        dispatch(listMeals())            
    }, [dispatch])

    return (
        <>
            <h1 className='b shadow-5 bg-white'>Meals of the Week</h1>
            <Container  >
                <MealCarousel className="w-1" />
            </Container>
            {
            loading
            ? <Loader/>
            : err
            ?(<Alert variant='danger'>{err}</Alert>)
            :<Row >
                {(meals || []).map((meal) =>( 
                    <Col sm={12} md={6} lg={4} xl={3} key={meal._id}>  
                        <Meal meal={meal}/>
                    </Col>
                    ))}
            </Row>
        }
            
        </>
    );
}
export default HomeView