import React from 'react'
import { useState, useRef, useEffect } from 'react'
import VietFlag from '../images/VietFlag.png'
import JapFlag from '../images/JapFlag.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import i18next from 'i18next'

const languages = [
    {
        name: "jp",
        icon: JapFlag,
        code: "jp"
    },
    {
        name: "vi",
        icon: VietFlag,
        code: "vi"
    }
]

function LanguageBtn() {

    const Lan = localStorage.getItem('i18nextLng') || 'vi'

    const [dropdown, setDropdown] = useState(false)
    const [curLan, setCurLan] = useState(Lan)

    const lanBtnRef = useRef();
    useEffect(() => {
        let handler = (e) => {
            if (!lanBtnRef.current.contains(e.target)) {
                setDropdown(false);
            }
        }
        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    })

    function changeLan(name) {
        setCurLan(name);
        localStorage.setItem('i18nextLng', name)
        setDropdown(false);
        i18next.changeLanguage(name)
    }

    return (
        <div className='lan-btn' ref={lanBtnRef}>
            <img src={curLan === 'vi' ? VietFlag : JapFlag} alt="language icon" className="lan-flag" />
            <FontAwesomeIcon icon={faAngleDown} onClick={() => setDropdown(true)} />
            {
                dropdown &&
                <div className="lan-dropdown">
                    {languages.map((lan, index) => {
                        return (<img src={lan.icon} alt="language icon" className="lan-flag" key={index} onClick={() => changeLan(lan.name)} />)
                    })}
                </div>
            }
        </div>
    )
}

export default LanguageBtn