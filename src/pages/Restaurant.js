import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import apiClient from '../APIclient'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import Star from '../components/showStar';
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import UserAvatar from '../components/UserAvatar'

const Address = ({ address }) => {
    const { t } = useTranslation()
    // const addr_num = address.substring(0, address.indexOf(' '));
    // const addr_street = address.substring(address.indexOf(' ') + 1);
    const addr_num = '5'
    const addr_street = 'abc'
    return (
        <div style={{ fontSize: '20px' }}>{t('address_text', { addr_num, addr_street })}</div>
    )
}

function Restaurant() {
    const { t } = useTranslation()
    const { restaurantId } = useParams();

    const [data, setData] = useState({});
    const [user, setUser] = useState({});
    const [token, setToken] = useState({});

    async function getData() {
        try {
            const response = await apiClient.get(`/restaurant/${restaurantId}`);
            console.log(response.data.data)
            setData(response.data.data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData();
        const userJson = localStorage.getItem('user');
        const userP = userJson ? JSON.parse(userJson) : null;
        setUser(userP);
        setToken(localStorage.getItem('access_token'))
    }, [])

    return (
        <div className='res_detail_outer_container' >
            <div className='res-detail-container'>
                <div className="res-detail-left">
                    <img src={data.logo} alt={`${data.address}`} className="res-detail-img" />
                    <div className='res-detail-service-container'>
                        {
                            data.services && data.services.map((service, index) => {
                                return (
                                    <>
                                        <div key={index} className='res-detail-service'>
                                            <FontAwesomeIcon icon={faSquareCheck} />
                                            <div>{t(`${service.name}`)}</div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                    <div className='res-detail-crowdedtime'>
                        <div>{t('restaurant.crowded_time')} {`${data.crowded_time}`}</div>
                        <div>{t('restaurant.now')} </div><span className='res-detail-green-status'></span>
                    </div>
                </div>
                <div className="res-detail-right">
                    <div className='res-detail-info'>
                        <h1 style={{ fontSize: '60px' }}>{data.name}</h1>
                        <Address address={data.address} />
                        <Star star={data.total_star} />
                    </div>
                    <div>
                        <div className="res-detail-title">{t('restaurant.menu')}</div>
                        <div className='res-detail-menu-container'>
                            {data.items && data.items.map((item, index) => {
                                return (
                                    <>
                                        <div key={index} className="res-detail-menu-item">
                                            <div>{item.name}</div>
                                            <dir>{item.price}</dir>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                        <div className="res-detail-title">{t('restaurant.rating')}</div>
                        {
                            !user && <div>{t('restaurant.login_request')}</div>
                        }
                        {
                            user &&
                            <form className='res-detail-form'>
                                <UserAvatar src={user.avatar} alt="User Avatar" width="40px" height="40px" /> <span>{t('restaurant.write_review')}</span>
                                <input type="text" className='res-detail-input' />
                            </form>
                        }
                        <Link to={`/restaurant/${restaurantId}/review`} style={{ color: 'black' }}>{t('restaurant.see_review')}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Restaurant