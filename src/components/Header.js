
import { Link } from 'react-router-dom'
import UserInfo from './UserInfo'


function Header() {

    const user = false;

    return (
        < >
            <div className='header'>
                {user && <UserInfo />}
                {!user && <Link to='/login' className='login-btn'><div>ログイン</div></Link>}
            </div>
        </>
    )
}

export default Header