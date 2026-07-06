import React from 'react';

const TICKER = [
    ['Chef-Curated', 'r'], ['Delivered Fresh', 'g'],
    ['No Subscriptions', 'r'], ['Real Chefs', 'g'],
    ['Order Today', 'r'], ['Fresh Daily', 'g'],
    ['Same-Day Delivery', 'r'], ['No Meal Kits', 'g'],
];

const Landing = () => {
    const items = [...TICKER, ...TICKER];
    return (
        <div className='hero-section'>
            <div className='hero-marquee' aria-hidden='true'>
                <div className='hero-marquee-track'>
                    {items.map(([text, gem], i) => (
                        <span key={i} className='hero-marquee-item'>
                            <span>{text}</span>
                            <span className={`hero-gem hero-gem-${gem}`}>◆</span>
                        </span>
                    ))}
                </div>
            </div>
            <div className='hero-content'>
                <h1>
                    Delicious Meals,<br />
                    <span className='hero-line-red'>Delivered Fresh</span>
                    <span className='hero-dot-green'>.</span>
                </h1>
                <p>Order from our chef-curated menu and get hot,
                   fresh meals delivered right to your door.</p>
                <a href='#meals' className='btn-hero'>Explore Menu</a>
                <div className='hero-features'>
                    <div className='hero-feature'><i className='fas fa-bolt'></i> Fast Delivery</div>
                    <div className='hero-feature'><i className='fas fa-star'></i> Top Rated</div>
                    <div className='hero-feature'><i className='fas fa-leaf'></i> Fresh Ingredients</div>
                </div>
            </div>
        </div>
    );
}

export default Landing;