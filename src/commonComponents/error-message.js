import React from 'react'

export default function ErrorMessage(props) {

    let suggestedTitleButton;

    if (props.error.button) {
        suggestedTitleButton = <button className="remote-button title-suggestion" onClick={() => props.addToTitleInput(props.error.button)}>{props.error.button}</button>
    }
    return (
        <div className="error-message">
            {props.error.message}
            {suggestedTitleButton}
        </div>
    )
}