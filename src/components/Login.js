import React, {useState, useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom';
import loginpic from '../images/loginpic.jpg'
import { UserContext } from '../App';
import './Login.css'

const Login = () => {

    const {state, dispatch} = useContext(UserContext);


    const history = useHistory();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async(e) => {
        e.preventDefault();

        const res= await fetch('/signin', {
            method: "post",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })

        const data = res.json();

        if (data.status === 400 || !data ){
            window.alert("Invalid Credentials");
            console.log("Invalid Credentials")
        }else {
            dispatch({type:"USER", payload: true })
            window.alert("Login successful");
            console.log("Successful login");

            history.push("/");

        }
    }

    return (
        <>
            <section className="signin">
                <div className="container mt-5">
                    <div className="signin-content">

                    <div className="signin-image">
                                <figure>
                                    <img src={loginpic} alt="Login" />
                                </figure>
                                <NavLink to="/signup" className="signin-image-link">Create an account</NavLink>
                            </div>
                        

                        <div className="signin-form">
                            <h2 className="form-title">Sign Up</h2>
                            <form className="register-form" id="register-form">

                                <div className="form-group-email">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email material-icons-name" ></i>
                                    </label>
                                    <input type="email" 
                                    name="email" 
                                    id="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="off" 
                                    placeholder="Your Email"/>
                                </div>
                                
                        
                                
                                <div className="form-group-password">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input 
                                    type="password" 
                                    name="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password" 
                                    autoComplete="off" 
                                    placeholder="Your Password"/>
                                </div>

                                <div className="form-group form-button">
                                    <input type="submit" 
                                    name="signin" 
                                    id="signin" 
                                    className="form-submit" 
                                    onClick={loginUser}
                                    value="Log In" />
                                </div>
                            </form>
                            </div>

                            
                    </div>

                </div>
            </section>
            
        </>
    )
}

export default Login
