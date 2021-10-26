import React from 'react';
import Item from './Item';

const ItemList = ({meals}) => {
  const mealsArray = meals.map((meal,i) => {
    return <Item key={meals[i].id} name={meals[i].name} price={meals[i].price} description={meals[i].description} image={meals[i].image}/>
  })
  return(
    <div>
      {mealsArray}
    </div>
  );
}
export default ItemList;
