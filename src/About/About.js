import React from 'react';
import '../styles/About.css'
import Image from '../styles/supperpic.jpeg';
import Header from '../Header/Header'

function About () {
    // A summary of what the application is about
    return(
        <>
            <Header/>
            <div className="abouttitle">
                <h1>About</h1>
                <img className="resizeimg" src={Image} alt="Supper Shuffle"/>
                <h3 className="subtitle">Our Mission</h3>
                <p>Super Shuffle aims to give food-lovers a delightful way to make recipes using ingredients already at home!</p>
                <p> 

                </p>
                <h3 className="subtitle">How We Do It</h3>
                <p>We use an API from themealdb.com due to its straightforward, ease of implementation. <br></br>This API allows developers to filter recipes by ingredients and also allows us to fetch and associate thumbnail images with each recipe. </p>
            </div>

        </>
    
    )
}

export default About; 