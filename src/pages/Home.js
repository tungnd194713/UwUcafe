import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import apiClient from '../APIclient'

import History from '../components/searchHistory'
import RestaurantCard from '../components/RestaurantCard'
import Star from '../components/showStar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faRotateRight } from '@fortawesome/free-solid-svg-icons'

const district_list = [
    'quan_Ba_Dinh',
    'quan_Hoan_Kiem',
    'quan_Tay_Ho',
    'quan_Long_Bien',
    'quan_Cau_Giay'
]

function Home() {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const [restaurants, setRestaurants] = useState([]);
    const [total, setTotal] = useState(0);

    async function getRestaurants() {
        try {
            const response = await apiClient.get('/restaurant');
            setRestaurants(response.data);
            setTotal(response.data.length);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getRestaurants();
    }, [])
    //onSubmit handle
    const [values, setValues] = useState({
        name: '',
        district: '',
        service: '',
        star_rating: '',
        is_crowded: null
    })
    async function SearchRes(values) {
        //fetch newdata
        try {
            const response = await apiClient.get('/restaurant', { params: values });
            setRestaurants(response.data);
            setTotal(response.data.length);
        } catch (error) {
            console.error(error);
        }
        //add history
        if (values.name !== '') {
            const h = localStorage.getItem('searchHistory') || '';
            const H = h.split('+')
            if (H.includes(values.name) === false) {
                if (h.length === 0) localStorage.setItem('searchHistory', values.name)
                else localStorage.setItem('searchHistory', `${h}+${values.name}`)
            }
        }
        setOpen(false)
        console.log(values)
        console.log('Submit form');
    }

    const onSubmit = event => {
        event.preventDefault();
        SearchRes(values);
    }

    const onChangeText = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const onChangeRating = (event) => {
        const { checked, value } = event.target
        if (checked) {
            values.star_rating = values.star_rating + `${value},`;
            setValues({ ...values })
        } else {
            values.star_rating = values.star_rating.replace(`${value},`, '')
        }
    }
    const onChangeDistrict = (event) => {
        const { checked, value } = event.target
        if (checked) {
            values.district = values.district + `${value},`;
            setValues({ ...values })
        } else {
            values.district = values.district.replace(`${value},`, '')
        }
    }
    const onChangeService = (event) => {
        const { checked, value } = event.target
        if (checked) {
            values.service = values.service + `${value},`;
            setValues({ ...values })
        } else {
            values.service = values.service.replace(`${value},`, '')
        }
    }
    const onChangeCrowded = (event) => {
        const { checked, value } = event.target
        if (checked) {
            if (value === '1') values.is_crowded = false
            if (value === '2') values.is_crowded = true
            setValues({ ...values })
        }
    }

    function removeOption() {
        setValues({
            name: '',
            district: '',
            service: '',
            star_rating: '',
            is_crowded: null
        })
        const checkboxs = document.querySelectorAll('.myCheckbox')
        checkboxs.forEach(checkbox => {
            checkbox.checked = false
        })
    }



    return (
        <>
            <div className="homepage-container">
                <div className="search-container">
                    <div className="search-left">
                        <div className="search-text">{t('search_text')}</div>
                        <button className="option-btn" onClick={() => setOpen(!open)}>{t('option_btn')}</button>
                    </div>
                    <div className="search-right">
                        <form onSubmit={onSubmit} autoComplete='off'>
                            <input type='textinput' name='name' value={values.name} onChange={onChangeText} className='search-bar' onClick={() => setShowHistory(!showHistory)} id='searchBar' />
                            <button type='submit' className='search-btn'>
                                <FontAwesomeIcon icon={faSearch} className='search-btn-icon' />
                            </button>
                            {/* the filter popup */}

                            <div className={open ? 'option-form' : 'tab-content-inactive'}>
                                <div className="option-popup-header">Filter</div>
                                <div className='popup-inside-container'>
                                    <div>
                                        <div className="tab-container">
                                            <div>
                                                <div className={toggleState === 1 ? "tab" : "tab-inactive"} onClick={() => toggleTab(1)}>場所</div>
                                                <div className={toggleState === 2 ? "tab" : "tab-inactive"} onClick={() => toggleTab(2)}>評価</div>
                                                <div className={toggleState === 3 ? "tab" : "tab-inactive"} onClick={() => toggleTab(3)}>サビース</div>
                                                <div className={toggleState === 4 ? "tab" : "tab-inactive"} onClick={() => toggleTab(4)}>混雑状況</div>
                                            </div>
                                            <div className={toggleState === 1 ? "tab-content" : "tab-content-inactive"}>
                                                {
                                                    district_list.map((dis, index) => {
                                                        return (
                                                            <div className="district-checkbox-home" key={index}>
                                                                <label class="myLabel" htmlFor={'district-home' + index}>{dis}
                                                                    <input type="checkbox" value={index + 1} onChange={onChangeDistrict} name='district' id={'district-home' + index} class="myCheckbox"/>
                                                                    <span class="checkmark"></span>
                                                                </label>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className={toggleState === 2 ? "tab-content" : "tab-content-inactive"}>
                                                <label class="myLabel" htmlFor="star5">
                                                    <Star className='show-star-home' star={5} />
                                                    <input type="checkbox" value='5' onChange={onChangeRating} name='star-rating' id="star5" class="myCheckbox"/>
                                                    <span class="checkmark"></span>
                                                </label>
                                                <label class="myLabel" htmlFor="star4">
                                                    <Star className='show-star-home' star={4} />
                                                    <input type="checkbox" value='4' onChange={onChangeRating} name='star-rating' id="star4" class="myCheckbox"/>
                                                    <span class="checkmark"></span>
                                                </label>
                                                <label class="myLabel" htmlFor="star3">
                                                    <Star className='show-star-home' star={3} />
                                                    <input type="checkbox" value='3' onChange={onChangeRating} name='star-rating' id="star3" class="myCheckbox"/>
                                                    <span class="checkmark"></span>
                                                </label>
                                                <label class="myLabel" htmlFor="star2">
                                                    <Star className='show-star-home' star={2} />
                                                    <input type="checkbox" value='2' onChange={onChangeRating} name='star-rating' id="star2" class="myCheckbox"/>
                                                    <span class="checkmark"></span>
                                                </label>
                                                <label class="myLabel" htmlFor="star1">
                                                    <Star className='show-star-home' star={1} />
                                                    <input type="checkbox" value='1' onChange={onChangeRating} name='star-rating' id="star1" class="myCheckbox"/>
                                                    <span class="checkmark"></span>
                                                </label>
                                            </div>
                                            <div className={toggleState === 3 ? "tab-content" : "tab-content-inactive"}>
                                                <label class="myLabel" htmlFor='service1'>エアコン
                                                    <input type="checkbox" value="1" onChange={onChangeService} name='service' id='service1' class="myCheckbox"/>
                                                    <span class="checkmark"></span>
                                                </label>
                                                <label class="myLabel" htmlFor='service2'>喫煙室
                                                    <input type="checkbox" value="2" onChange={onChangeService} name='service' id='service2' class="myCheckbox"/>
                                                    <span class="checkmark"></span>
                                                </label>
                                                <label class="myLabel" htmlFor='service3'>駐車場
                                                    <input type="checkbox" value="3" onChange={onChangeService} name='service' id='service3' class="myCheckbox"/>
                                                    <span class="checkmark"></span>
                                                </label>
                                                <label class="myLabel" htmlFor='service4'>配達
                                                    <input type="checkbox" value="4" onChange={onChangeService} name='service' id='service4' class="myCheckbox"/>
                                                    <span class="checkmark"></span>
                                                </label>
                                            </div>
                                            <div className={toggleState === 4 ? "tab-content" : "tab-content-inactive"}>
                                                <label class="myLabel" htmlFor='is_crowded'>少ない
                                                    <input type="checkbox" value="1" onChange={onChangeCrowded} name='status' id='is_crowded' class="myCheckbox"/>
                                                    <span class="checkmark"></span>
                                                </label>
                                                <label class="myLabel" htmlFor='not_crowded'>多い
                                                    <input type="checkbox" value="2" onChange={onChangeCrowded} name='status' id='not_crowded' class="myCheckbox"/>
                                                    <span class="checkmark"></span>
                                                </label>
                                            </div>

                                        </div>
                                        <div className="button-container">
                                            <button style={{ border: 'none', background: 'none', cursor: 'pointer' }} type='button' onClick={removeOption}>
                                                <FontAwesomeIcon icon={faRotateRight} rotation={270} style={{ height: '25px', color: 'blue' }} />
                                            </button>
                                            <button className='option-popup-btn' onClick={() => setOpen(false)} type='button'>Cancel</button>
                                            <button type='submit' className='option-popup-btn'>OK</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </form>
                        {showHistory && <History />}
                    </div>
                </div >
                {/* total result and show the result */}
                < div className="total-result" > {`${total} 件の結果を表示しています...`
                }</div >
                <div className="result-container">
                    {
                        restaurants.map((restaurant) => {
                            return <RestaurantCard restaurant={restaurant} key={restaurant.id} />
                        })
                    }
                </div>

            </div >
        </>
    )
}

export default Home