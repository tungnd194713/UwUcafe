import React from 'react'
import defaulImage from '../images/defaultavatar.jpg'
import { useTranslation } from 'react-i18next';

import Star from './showStar';

function RestaurantCard({ restaurant }) {

    const { t } = useTranslation()

    const { name, address, total_star, logo } = restaurant;

    const addr_num = address.substring(0, address.indexOf(' '));
    const addr_street = address.substring(address.indexOf(' ') + 1);

    return (
        <div className="restaurant-card">
            <img src={logo ? logo : defaulImage} alt={`beautiful ${name}`} className='res-img-home' />
            <div>
                <div>{`${name}`}</div>
                <div>{t('address_text', { addr_num, addr_street })}</div>
                <Star className='show-star-home' star={total_star} />
            </div>
        </div>
    )
}

export default RestaurantCard