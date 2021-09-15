import React, {useState, useEffect} from 'react'
import './Home.css'

const Home = () => {
    const [userName, setUserName] = useState('');
    const [show, setShow] = useState(false);

    const userHomePage = async () => {
        try{
            const res = await fetch('/getdata', {  //backend ko /about ho yo
            method: "get",
            headers: {
                "Content-Type": "application/json"
            },
            });
            const data = await res.json();
            console.log(data);
            setUserName(data.name);
            setShow(true)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        userHomePage();
    }, []);

    return (
        <div className="home__page">
            <div className="home_page">
                <div className="home_div">
                    <p className="pt-0">WELCOME</p>
                    <h1>{userName}</h1>
                    <h2>{ show ? 'Happy, to see you back' :'We are the MERN Developers'}</h2 >
                </div>
            </div>
            
        </div>
    )
}

export default Home
