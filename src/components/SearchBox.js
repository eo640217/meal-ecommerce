import React from 'react';

const SearchBox = ({searchChange}) => {
  return (
    <div className = 'pa2'>
      <input
      className = 'pa3 tc b--light-blue bg-washed-blue'
      type='search'
      placeholder='Search Item/Ingredient'
      onChange = {searchChange}
       />
    </div>
  );
}
export default SearchBox;
