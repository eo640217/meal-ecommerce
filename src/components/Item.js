import React from 'react';
import './Item.css';

const Item = ({name,description,price,image}) =>{
  return (
    <div className = 'itemDisplay bg-light-blue dib grow br5 ma3 shadow-5 tc h-30 w-30'>
      <img alt='item' src={image}/>
      <div className = 'desc'>
        <h2> {name} </h2>
        <h3> ${price} </h3>
        <h4> {description} </h4>
      </div>
    </div>
  );
}
export default Item;
