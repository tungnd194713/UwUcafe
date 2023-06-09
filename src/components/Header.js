
import { Link } from 'react-router-dom'
import UserInfo from './UserInfo'
import { useTranslation } from 'react-i18next';


function Header() {

    const { t } = useTranslation()
    const user = false;

    return (
        < >
            <div className='header'>
                {user && <UserInfo />}
                {!user && <Link to='/login' className='login-btn'><div>{t('login_btn')}</div></Link>}
            </div>
        </>
    )
}

export default Header