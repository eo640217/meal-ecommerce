import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import {Link} from 'react-router-dom';
import Collapse from 'react-bootstrap/Collapse'
import { Button} from '@mui/material'



const Meal = ({meal}) =>{
  const [open, setOpen] = useState (false);
  return (
    <>
     <Card className= 'my-3 rounded'>
       <Link to={`/meal/${meal._id}`}  className=''>
          <Card.Img src={meal.image} variant='top'/>
          </Link>
          <Card.Body>
          <Link to={`/meal/${meal._id}`}>
            <Card.Title className="b f4" as='div'>
              <strong>
                {meal.name}
              </strong>
            </Card.Title>
          </Link>

            {/* <Card.Text as='div'>
              <div className='my-3'>
                {meal.description}
              </div>
            </Card.Text> */}

            <Card.Text as='div'>
              <Rating value={meal.rating} 
              text={` ${meal.numReviews} reviews`}
              color='#F0A500'
              />
            </Card.Text>

            <Card.Text as='div'>
              <div className='b f4 my-3'>
                $ {meal.price}
              </div>
            </Card.Text>

            <Button
              onClick={() => setOpen(!open)}
              aria-controls="mealDetails-collapse-text"
              aria-expanded={open}
              variant="outlined"
            >
              Description
            </Button>

            <Collapse in={open}>
              <div id="mealDetails-collapse-text">
               {meal.description}
              </div>
            </Collapse>
          </Card.Body>
     </Card>
    </>
  )
}
export default Meal;
