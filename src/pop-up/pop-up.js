import React from 'react';

export default function PopUp(props) {
    return (
        <div className="pop-up">
            <p className="popup-content">{props.message}</p>
        </div>
    )
}