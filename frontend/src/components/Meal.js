import React from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const Meal = ({ meal }) => {
    return (
        <div className='meal-card'>
            <Link to={`/meal/${meal._id}`} className='meal-card-img-wrap'>
                <img src={meal.image} alt={meal.name} />
            </Link>
            <div className='meal-card-body'>
                <div className='meal-card-title'>
                    <Link to={`/meal/${meal._id}`}>{meal.name}</Link>
                </div>
                <div className='meal-card-desc'>{meal.description}</div>
                <Rating value={meal.rating} text={`${meal.numReviews} reviews`} color='#ffc300' />
                <div className='meal-card-footer'>
                    <span className='meal-card-price'>${meal.price}</span>
                    <Link to={`/meal/${meal._id}`} className='btn-view-meal'>View Meal</Link>
                </div>
            </div>
        </div>
    );
}
export default Meal;
