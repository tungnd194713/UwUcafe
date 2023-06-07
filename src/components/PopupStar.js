import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'

function PopupStar({ star }) {

    switch (star) {
        case 1:
            return (<>
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
            </>);
        case 2:
            return (<>
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
            </>);
        case 3:
            return (<>
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
            </>);
        case 4:
            return (<>
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
                <FontAwesomeIcon icon={faStarSolid} style={{ color: "#fbff00", }} />
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

export default PopupStar