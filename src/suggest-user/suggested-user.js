import React from 'react'

export default function SuggetedUser(props) {
    return (
        <section>
            <header>
                <h2>{props.user.username}</h2>
                <p>{props.user.bio}</p>
                <p>{`Match Score: ${props.user.matchScore}`}</p>
            </header>
            <button>Follow</button>
        </section>
    )
}