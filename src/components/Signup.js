import React, {useState} from 'react'
import signpic from '../images/signuppic.jpg'
import {NavLink, useHistory} from 'react-router-dom';
import './Signup.css'

const Signup = () => {

    const history = useHistory();

    const [user, setUser] = useState({
        name:"",
        email:"",
        phone:"",
        work:"",
        password:"",
        cpassword:""
    }); 

    let name, value;

    const handleInput = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value

        setUser({...user, [name]:value })        
    }

    const PostData = async(e) => {
        e.preventDefault();

        const {name, email, phone, work, password, cpassword} = user;

        const res = await fetch("/register", {
            method: "post",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        })
        const data = await res.json();

        if (data.status === 422 || !data ){
            window.alert("Invalid Registration");
            console.log("Invalid Registration")
        }else {
            window.alert("Registration successful");
            console.log("Successful Registration");

            history.push("/login");

        }

    }

    return (
        <>
            <section className="signup">
                <div className="container mt-5">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign Up</h2>
                            <form method="post" className="register-form" id="register-form">
                                <div className="form-group-signup">
                                    <label htmlFor="name">
                                        <i className="zmdi zmdi-account material-icons-name"></i>
                                    </label>
                                    <input type="text" name="name" id="name" value={user.name} onChange={handleInput} autoComplete="off" placeholder="Your Name"/>
                                </div>

                                <div className="form-group-signup">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email material-icons-name"></i>
                                    </label>
                                    <input type="email" name="email" id="email" value={user.email} onChange={handleInput} autoComplete="off" placeholder="Your Email"/>
                                </div>
                                
                                <div className="form-group-signup">
                                    <label htmlFor="phone">
                                        <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
                                    </label>
                                    <input type="number" name="phone" id="phone" value={user.phone} onChange={handleInput} autoComplete="off" placeholder="Your Phone"/>
                                </div>
                                
                                <div className="form-group-signup">
                                    <label htmlFor="work">
                                        <i className="zmdi zmdi-slideshow material-icons-name"></i>
                                    </label>
                                    <input type="text" name="work" id="work" value={user.work} onChange={handleInput} autoComplete="off" placeholder="Your Profession"/>
                                </div>
                                
                                <div className="form-group-signup">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" name="password" id="password" value={user.password} onChange={handleInput} autoComplete="off" placeholder="Your Password"/>
                                </div>

                                <div className="form-group-signup">
                                    <label htmlFor="cpassword">
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" name="cpassword" id="cpassword" value={user.cpassword} onChange={handleInput}  autoComplete="off" placeholder="Confirm Password"/>
                                </div>

                                <div className="form-group-signup form-button-signup">
                                    <input type="submit" 
                                    name="signup" 
                                    id="signup" 
                                    className="form-submit" 
                                    value="Register"
                                    onClick={PostData} />
                                </div>
                            </form>
                        </div>

                            <div className="signup-image">
                                <figure>
                                    <img src={signpic} alt="registration" />
                                </figure>
                                <NavLink to="/login" className="signup-image-link">Already Registered?</NavLink>
                            </div>
                        
                    </div>

                </div>
            </section>
        </>
    )
}

export default Signup
