import React, {useEffect} from "react";
import { Row, Col, Container } from 'react-bootstrap';
import Meal from "../components/Meal";
import {useDispatch, useSelector} from 'react-redux';
import {listMeals} from '../actions/mealAction';
import Message from "../components/Message";
import Loader from "../components/Loader";
import Landing from "../components/Landing";


const HomeView = () => {
    const dispatch = useDispatch();
    const mealList = useSelector((state) => state.mealList);
    const {loading, error, meals} = mealList;

    useEffect(() => {
        dispatch(listMeals())
    }, [dispatch])

    return (
        <>
            <Landing />
            <Container>
                <div className='meals-section' id='meals'>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant='danger'>{error}</Message>
                    ) : (
                        <>
                            <div className='section-header'>
                                <h2 className='section-title'>Our Menu</h2>
                                <div className='section-accent-bar'></div>
                                <p className='section-subtitle'>Freshly prepared, chef-curated meals ready to order</p>
                            </div>
                            <Row>
                                {meals.map((meal) => (
                                    <Col md={4} key={meal._id} className='mb-4'>
                                        <Meal meal={meal} />
                                    </Col>
                                ))}
                            </Row>
                        </>
                    )}
                </div>
            </Container>
        </>
    );
}
export default HomeView;
