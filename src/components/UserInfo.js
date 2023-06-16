import React from 'react'
import UserAvatar from './UserAvatar'

function UserInfo() {
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;

    return (
        <div className='d-flex'>
            <UserAvatar src={user.avatar} alt="User Avatar" width="40px" height="40px" />
            <span style={{lineHeight: '40px', marginLeft: '10px', marginRight: '20px', fontSize: '20px'}}>{user.name}</span>
        </div>
    )
}

export default UserInfo