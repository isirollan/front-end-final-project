import '../styles/Header.css'
import React from 'react';
import { useNavigate } from "react-router-dom";

function Header() {
    // Set function to navigate into components
    const navigate = useNavigate();
    
    const homeNav = () => {
        navigate("/");
    }
    const aboutNav = () => {
        navigate("/about");
    }

    const contactNav = () => {
        navigate("/contact");
    }

    return (
        <>
            <div className="background">
                <div className="header">
                    <div className="title">
                        <button className="suppershufflebutton" onClick={homeNav}>Supper Shuffle</button>
                    </div>
                </div>
                <div className="header">
                    <div className="about">
                        <button className="aboutbutton" onClick={aboutNav}>About</button>
                    </div>
                </div>
                <div className="header">
                    <div className="contact">
                        <button className="homecontactbutton" onClick={contactNav}>Contact</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header; 