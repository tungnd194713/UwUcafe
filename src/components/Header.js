import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { useState } from 'react'

import UserInfo from './UserInfo'
import LanguageBtn from './LanguageBtn';

function Header() {
    const { t } = useTranslation()
    const initializeState = () => !!JSON.parse(localStorage.getItem("user"));

    const [user, setUser] = useState(initializeState);

    return (
        < >
            <div className='header'>
                <LanguageBtn />
                {user && <UserInfo />}
                {!user && <Link to='/login' className='login-btn'><div>{t('login_btn')}</div></Link>}
            </div>
        </>
    )
}

export default Header