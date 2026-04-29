import React from 'react';

const Landing = () => {
    return (
        <div className='hero-section'>
            <span className='hero-emoji'>🍽</span>
            <h1>Delicious Meals,<br />Delivered Fresh</h1>
            <p>Order from our chef-curated menu and get hot,
               fresh meals delivered right to your door.</p>
            <a href='#meals' className='btn-hero'>Explore Menu</a>
            <div className='hero-features'>
                <div className='hero-feature'><i className='fas fa-bolt'></i> Fast Delivery</div>
                <div className='hero-feature'><i className='fas fa-star'></i> Top Rated</div>
                <div className='hero-feature'><i className='fas fa-leaf'></i> Fresh Ingredients</div>
            </div>
        </div>
    );
}

export default Landing;