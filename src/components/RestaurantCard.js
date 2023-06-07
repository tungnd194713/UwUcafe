import React from 'react'
import defaulImage from '../images/defaultavatar.jpg'

import Star from './showStar';

function RestaurantCard({ restaurant }) {

    const { name, address, total_star, logo } = restaurant;

    const split = (str) => {
        const number = str.substring(0, str.indexOf(' '));
        const street = str.substring(str.indexOf(' ') + 1);
        return { number, street }
    }

    const splited_addr = split(address)

    return (
        <div className="restaurant-card">
            <img src={logo ? logo : defaulImage} alt="coffe image" className='res-img-home' />
            <div>
                <div>{`${name}`}</div>
                <div>{`${splited_addr.street} 通り${splited_addr.number}番地`}</div>
                <Star className='show-star-home' star={total_star} />
            </div>
        </div>
    )
}

export default RestaurantCard