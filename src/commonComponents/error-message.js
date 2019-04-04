import React from 'react'

export default function ErrorMessage(props) {
    return (
        <div className="error-message">
            {props.errorMessage}
        </div>
    )
}