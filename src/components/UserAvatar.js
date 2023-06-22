import React from 'react';

const UserAvatar = ({ src, alt, width, height }) => {
  const avatarStyle = {
    width: width,
    height: height,
    borderRadius: '50%',
    overflow: 'hidden',
    marginLeft: '20px'
  };

  return (
    <div className="avatar" style={avatarStyle}>
      <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
};

export default UserAvatar;