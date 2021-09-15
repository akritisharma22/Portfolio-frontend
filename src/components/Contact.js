import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import './Contact.css'

const Contact = () => {

    const history = useHistory(); 

    const [userData, setUserData] = useState({name:"", email:"", phone:"", message:""});
    

    const userContact = async () => {
        try{
            const res = await fetch('/getdata', {  //backend ko /about ho yo
            method: "get",
            headers: {
                "Content-Type": "application/json"
            },
            });
            const data = await res.json();
            console.log(data);
            setUserData({...userData, name:data.name, email:data.email, phone:data.phone });

            if( !res.status === 200 ) {
                const error = new Error(res.error);
                throw error;
            }
        }
        catch (err) {
            console.log(err);
            history.push('/login');
        }
    }

    //calls the function ONCE the page is loaded or reloaded
    //async function cant be used inside useEffect
    useEffect(() => {
        userContact();
    }, []);

    //we are storing data (message) in states:
    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userData, [name]:value })
    }

    //sending the message to backend
    const contactForm = async(e) => {
        e.preventDefault();

        const { name, email, phone, message } = userData;

        const res = await fetch('/contact', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        })
        const data = await res.json();

        if(!data) {
            console.log("Message not send")
        } else {
            alert("Message send")
            setUserData({...userData, message:""})
        }
    }


    return (
        <>
            <div className="contact_info">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">

                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                                <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
                                <div className="contact info content">
                                    <div className="contact_info_title">
                                        Name
                                    </div>
                                    <div className="contact_info_text">
                                        Akriti Sharma
                                    </div>
                                </div>
                            </div>

                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                                <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
                                <div className="contact info content">
                                    <div className="contact_info_title">
                                        Email
                                    </div>
                                    <div className="contact_info_text">
                                        akritis801@gmail.com
                                    </div>
                                </div>
                            </div>

                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                                <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
                                <div className="contact info content">
                                    <div className="contact_info_title">
                                        Phone
                                    </div>
                                    <div className="contact_info_text">
                                        +977 5457754657
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* contact us form */}
            <div className="contact_form">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="contact_form_container py-5">
                                <div className="contact_form_title">
                                    Get in Touch
                                </div>
                                <form method="post" id="contact_form">
                                    <div className="contact_form_name d-flex justify-content-between align-items-between">

                                        <input type="text" id="contact_form_name" 
                                        className="contact_form_name input_field" 
                                        placeholder="Your name" 
                                        name="name"
                                        value={userData.name}
                                        onChange={handleInputs}
                                        required="true"/>

                                        <input type="email" id="contact_form_email" 
                                        className="contact_form_email input_field" 
                                        placeholder="Your email" 
                                        value={userData.email}
                                        name="email"
                                        onChange={handleInputs}
                                        required="true"/>

                                        <input type="number" id="contact_form_phone" 
                                        className="contact_form_phone input_field" 
                                        placeholder="Your Phone Number"
                                        name="phone"
                                        value={userData.phone}
                                        onChange={handleInputs}
                                        required="true"/>
                                    </div>
 
                                    <div className="contact_form_text mt-5">
                                        <textarea className="text_field contact_form_message" 
                                        placeholder="Message" 
                                        name="message"
                                        value={userData.message}
                                        onChange={handleInputs}
                                        cols="30" 
                                        rows="10"></textarea>
                                    </div>

                                    <div className="contact_form_button">
                                        <button type="submit" 
                                        className="button contact_submit_button"
                                        onClick={contactForm}
                                        >Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact
