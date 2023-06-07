import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRecycle } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

function SearchHistory() {

    const navigate = useNavigate()
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const h = localStorage.getItem('searchHistory') || '';
        const H = h.split('+')
        if (h.length !== 0) setHistory(H)
    }, [])

    function delteHistory(h) {
        const newH = history.filter(his => his !== h)
        console.log(newH);
        if (newH.length === 0) localStorage.removeItem('searchHistory')
        else {
            let newHstr = '';
            for (let i = 0; i < newH.length; i++) {
                console.log(newH[i]);
                if (i === newH.length - 1) newHstr = newHstr + newH[i]
                else newHstr = newHstr + newH[i] + '+'
                console.log('loop ' + i + 'newHstr' + newHstr)
            }
            localStorage.setItem('searchHistory', newHstr)
        }
        navigate(0)
    }
    function reuseHistory(h) {
        const search = document.getElementById('searchBar')
        search.value = h
    }
    if (history.length === 0) return <></>
    else return (
        <div className='history-container'>
            {
                history.map((h) => {
                    return (
                        <div className="history-line" key={history.indexOf(h)}>
                            <FontAwesomeIcon icon={faRecycle} className='history-reuse' onClick={() => reuseHistory(h)} />
                            <div className="history-text">{h}</div>
                            <button onClick={() => delteHistory(h)} className='history-delete'>Delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SearchHistory