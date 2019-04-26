import React from 'react'

export default function SuggetedUser(props) {

    return (
        <section>
            <header>
                <h2>{props.user.username}</h2>
                <p>{props.user.bio}</p>
                <p>{`Match Score: ${props.user.match_score}`}</p>
            </header>
            <button onClick={() => props.addNewFriend(props.currentUser, props.user.user_id, props.user.username)}>Follow</button>
        </section>
    )
}