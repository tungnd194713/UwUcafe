import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '../styles/reviews.css';
import apiClient from '../APIclient'
import ShowStar from '../components/showStar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'


const Address = ({ address }) => {
    const { t } = useTranslation()
    const addr_num = address.substring(0, address.indexOf(' '));
    const addr_street = address.substring(address.indexOf(' ') + 1);
    return (
        <div className='info-content__address'>{t('address_text', { addr_num, addr_street })}</div>
    )
}

function Reviews() {
    const { t } = useTranslation()
    const { restaurantId } = useParams();
    const [user, setUser] = useState({})
    const [reviews, setReviews] = useState([])
    const [restaurant, setRestaurant] = useState({})
    const [toggleState, setToggleState] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    async function getData() {
        try {
            const response1 = await apiClient.get(`/restaurant/${restaurantId}`);
            const response2 = await apiClient.get(`/restaurant/${restaurantId}/review?per_page=5&current_page=1`)
            setRestaurant(response1.data.data);
            setReviews(response2.data.data);
            console.log(reviews)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getData();
        const userJson = localStorage.getItem('user');
        const userP = userJson ? JSON.parse(userJson) : null;
        setUser(userP);
    }, [])

    //pagination
    const handlePageChange = async (newPage) => {
        try {
            setCurrentPage(newPage)
            const response = await apiClient.get(`/restaurant/${restaurantId}/review?per_page=5&current_page=${newPage}`);
            setReviews(response.data.data);
            console.log(reviews)
        } catch (error) {
            console.error(error);
        }
    };

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <div className="wrapper">
            <div className="container">
                <div className="box">
                    {/* <!-- Info --> */}
                    <div className="info">
                        <div className="info__image">
                            <img src={restaurant.logo} alt="" className="" />
                        </div>
                        <div className="info-content">
                            <h3 className="info-content__name">{restaurant.name}</h3>
                            {restaurant.address && <Address address={restaurant.address} />}
                            <div className="info-bottom">
                                {restaurant.view && <ShowStar star={restaurant.total_star} total_review={restaurant.view} />}
                            </div>
                        </div>
                    </div>
                    {/* <!-- Preview --> */}
                    <main className="preview">
                        <div className="filter-stars">
                            <h3 className="filter-stars__label">レビュー</h3>
                            <div className="filter-stars__buttons">
                                <div className={toggleState === 0 ? "btn-active" : "btn"} onClick={() => toggleTab(0)}>{t('review.all_filter')}</div>
                                <div className={toggleState === 5 ? "btn-active" : "btn"} onClick={() => toggleTab(5)}>5{t('review.star')}</div>
                                <div className={toggleState === 4 ? "btn-active" : "btn"} onClick={() => toggleTab(4)}>4{t('review.star')}</div>
                                <div className={toggleState === 3 ? "btn-active" : "btn"} onClick={() => toggleTab(3)}>3{t('review.star')}</div>
                                <div className={toggleState === 2 ? "btn-active" : "btn"} onClick={() => toggleTab(2)}>2{t('review.star')}</div>
                                <div className={toggleState === 1 ? "btn-active" : "btn"} onClick={() => toggleTab(1)}>1{t('review.star')}</div>
                            </div>
                        </div>
                        <div className="filter-comment">
                            <label className="select" for="slct">
                                <select id="slct" required="required">
                                    <option value="" disabled="disabled" selected="selected">
                                        Select option
                                    </option>
                                    <option value="#">1.最も最近の</option>
                                    <option value="#">2.最も最近の</option>
                                    <option value="#">3.最も最近の</option>
                                    <option value="#">4.最も最近の</option>
                                    <option value="#">5.最も最近の</option>
                                </select>
                                <FontAwesomeIcon icon={faArrowDown} style={{ width: '20px', height: '15px' }} />
                            </label>

                        </div>
                        {/* <!-- Comment --> */}
                        <div className="comment-wrapper">
                            <ul className="comment">
                                {reviews.length > 0 && reviews.map((review, index) => {
                                    console.log(review)
                                    return (
                                        <li className="comment-item" key={index}>
                                            <i className="fa-regular fa-circle-user comment-item__avatar"></i>
                                            <div className="comment-content">
                                                <img src={review.user.avatar} className='comment-item__avatar' />
                                                <h3 className="comment-content__user">{review.user.username}</h3>
                                                <div className="comment-content__stars">
                                                    <ShowStar star={review.star_rating} />
                                                </div>
                                                <div className="comment-content__images">
                                                    <img
                                                        src={review.image}
                                                    />
                                                </div>
                                                <div className="comment-content__text">
                                                    {review.content}
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className="pagination-wrapper">
                            {/* <div className="pagination">
                                <button className="pagination__button active">1</button>
                                <button className="pagination__button">2</button>
                                <button className="pagination__button">3</button>
                            </div> */}
                            <div>
                                {
                                    currentPage === 1 && (
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination">
                                                <li className={"page-item active"}><a className="page-link" href="#" onClick={() => handlePageChange(currentPage)}>{currentPage}</a></li>
                                                <li className="page-item" onClick={() => handlePageChange(currentPage + 1)}><a className="page-link" href="#">{currentPage + 1}</a></li>
                                                <li className="page-item"><a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 2)}>{currentPage + 2}</a></li>
                                            </ul>
                                        </nav>
                                    )
                                }
                            </div>
                            <div>
                                {
                                    currentPage > 1 && (
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination">
                                                <li className={"page-item"}><a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>{currentPage - 1}</a></li>
                                                <li className="page-item active" onClick={() => handlePageChange(currentPage)}><a className="page-link" href="#">{currentPage}</a></li>
                                                <li className="page-item"><a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>{currentPage + 1}</a></li>
                                            </ul>
                                        </nav>
                                    )
                                }
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Reviews