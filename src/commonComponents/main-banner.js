import React from 'react';

export default function MainBanner(props){
    return (
        <header role="banner" className="main-banner">
            <div className="movie-headers">
                <h1 ><span className="fas fa-film icon"></span>Movie Suggestor</h1>
                <h2 className="subtitle">Personalized Movie Suggestions</h2>
            </div>
        </header>
    )
}