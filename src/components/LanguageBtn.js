import React from 'react'
import { useState, useRef, useEffect } from 'react'
import VietFlag from '../images/VietFlag.png'
import JapFlag from '../images/JapFlag.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'

function LanguageBtn() {

    const { i18n } = useTranslation()

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

    function changeLanVi() {
        setCurLan('vi');
        setDropdown(false);
        i18n.changeLanguage('vi')
    }
    function changeLanJp() {
        setCurLan('jp');
        setDropdown(false);
        i18n.changeLanguage('jp')
    }

    return (
        <div className='lan-btn' ref={lanBtnRef}>
            <img src={curLan === 'vi' ? VietFlag : JapFlag} alt="language icon" className="lan-flag" />
            <FontAwesomeIcon icon={faAngleDown} onClick={() => setDropdown(true)} />
            {
                dropdown &&
                <div className="lan-dropdown">
                    <img src={VietFlag} alt="language icon" className="lan-flag" onClick={() => changeLanVi()} />
                    <img src={JapFlag} alt="language icon" className="lan-flag" onClick={() => changeLanJp()} />
                </div>
            }
        </div>
    )
}

export default LanguageBtn