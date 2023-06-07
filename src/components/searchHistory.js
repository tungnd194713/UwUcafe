import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRecycle } from '@fortawesome/free-solid-svg-icons'

function SearchHistory({ setName }) {

    const [history, setHistory] = useState([]);

    useEffect(() => {
        const h = localStorage.getItem('searchHistory') || '';
        const H = h.split('+')
        if (h.length !== 0) setHistory(H)
    }, [])

    function delteHistory(h) {
        const newH = history.filter(his => his !== h)
        console.log(newH);
        if (newH.length === 0) {
            localStorage.removeItem('searchHistory')
            setHistory([]);
        } else {
            let newHstr = '';
            for (let i = 0; i < newH.length; i++) {
                console.log(newH[i]);
                if (i === newH.length - 1) newHstr = newHstr + newH[i]
                else newHstr = newHstr + newH[i] + '+'
            }
            setHistory(newH);
            localStorage.setItem('searchHistory', newHstr)
        }
    }

    function reuseHistory(h) {
        const search = document.getElementById('searchBar')
        search.value = h
        setName(h)
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
                            <button onClick={() => delteHistory(h)} className='history-delete'>消去</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SearchHistory