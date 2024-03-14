import React from 'react';
import {useState, useEffect} from 'react';
import '../styles/Contact.css'
import Header from '../Header/Header'


// Function to add a contact form in case our users wants to add recipes, or any updates
function Contact () {
    const handleSubmit=event => {
        event.preventDefault();
        alert("Sending confirmation details to your email!")
    }

    return(
        <>
            <Header />
            <div className="intro">
                <h1>Contact</h1>
                <p>Please provide your contact details and email for updates and notifications about Supper Shuffle!</p>
            </div>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Name</p>
                        <input name="name" placeholder="Enter full name..."/>
                    </label>
                    <label>
                        <p>Email</p>
                        <input name="email" placeholder="Enter email..."/>
                    </label>
                    <label>
                        <p>Phone Number</p>
                        <input name="phone" placeholder="Enter phone number..."/>
                    </label>
                    <label>
                        <p>Subject</p>
                        <textarea id="subject" name="subject" style={{height: "100px", width:"400px"}}></textarea>
                    </label>
                    <p> </p>
                    <p> </p>
                    <button className= "contactbutton" type="submit">Submit</button>
                </form>
             </div>
        </>

    )
}


export default Contact; 