import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'

function showStar({ star }) {

    switch (star) {
        case 1:
            return (<>
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
                <FontAwesomeIcon icon={faStar} className='star-icon-home' />
                <FontAwesomeIcon icon={faStar} className='star-icon-home' />
                <FontAwesomeIcon icon={faStar} className='star-icon-home' />
                <FontAwesomeIcon icon={faStar} className='star-icon-home' />
            </>);
        case 2:
            return (<>
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
                <FontAwesomeIcon icon={faStar} className='star-icon-home' />
                <FontAwesomeIcon icon={faStar} className='star-icon-home' />
                <FontAwesomeIcon icon={faStar} className='star-icon-home' />
            </>);
        case 3:
            return (<>
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
                <FontAwesomeIcon icon={faStar} className='star-icon-home' />
                <FontAwesomeIcon icon={faStar} className='star-icon-home' />
            </>);
        case 4:
            return (<>
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
                <FontAwesomeIcon icon={faStar} className='star-icon-home' />
            </>);
        case 5:
            return (<>
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
            </>);
    }

}

export default showStar