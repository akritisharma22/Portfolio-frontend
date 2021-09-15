import React, {useEffect, useState} from 'react'
import './About.css'
import loginpic from '../images/loginpic.jpg'
import me from '../images/me.jpg'
import {useHistory} from 'react-router-dom'


const About = () => {

    const history = useHistory(); 

    const [userData, setUserData] = useState({});

    const callAboutPage = async() => {
        try{
            const res = await fetch('/about',{  //backend ko /about ho yo
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials:"include"
            })
            const data = await res.json();
            console.log(data);
            setUserData(data);

            if(!res.status === 200 ) {
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
        callAboutPage();
    }, []);


    return (
        <>
            <div className="container">
                <form method="get">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src={userData.name === "Ak Sharma" ? me : loginpic} alt="Akriti Sharma" />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="profile_head">
                                <h5>{userData.name}</h5>
                                <h6>Web Developer</h6>
                                <p className="profile-rating mt-3 mb-5">RANKINGS <span> 1/10 </span></p>

                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a href="#home" className="nav-link active" id="home-tab" data-toggle="tab" role="tab">About</a>
                                    </li>
                                    <li className="nav-item">
                                    <a href="#profile" className="nav-link" id="profile-tab" data-toggle="tab" role="tab">Timeline</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="edit-button col-md-2">
                            <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
                        </div>
                    </div>

                    <div className="row">
                        {/* left side url */}
                        <div className="col-md-4">
                            <div className="profile-work">
                                <p>WORK LINK</p>
                                <a href="https://www.youtube.com/" target="youtue">Youtube</a>
                                <a href="https://www.youtube.com/" target="youtue">Instagram</a>
                                <a href="https://www.youtube.com/" target="youtue">Web Developer</a>
                                <a href="https://www.youtube.com/" target="youtue">Facebook</a>

                            </div>
                        </div>

                        {/* right side data toggle */}
                        <div className="col-md-8 pl-5 about-info">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab" >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>UserID</label>
                                        </div>

                                        <div className="col-md-6">
                                            <label>4356789</label>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Name</label>
                                        </div>

                                        <div className="col-md-6">
                                            <label>{userData.name}</label>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Email</label>
                                        </div>

                                        <div className="col-md-6">
                                            <label>{userData.email}</label>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Phone</label>
                                        </div>

                                        <div className="col-md-6">
                                            <label>{userData.phone}</label>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Profession</label>
                                        </div>

                                        <div className="col-md-6">
                                            <label>{userData.work}</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="profile" aria-labelledby="profile-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Experience</label>
                                        </div>
                                        <div className="col-md-6">
                                            <label>Begginer</label>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Hourly Rate</label>
                                        </div>
                                        <div className="col-md-6">
                                            <label>10$/hr</label>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Total Projects</label>
                                        </div>
                                        <div className="col-md-6">
                                            <label>10</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default About
