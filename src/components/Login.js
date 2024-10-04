import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    })

    const handleLogin = async () => {
        let result = await fetch('http://localhost:4000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if (result.name) {
            localStorage.setItem("user", JSON.stringify(result));
        const auth = localStorage.getItem('user');
            console.log('auth ', auth);
            navigate('/');
        }
        else {
            alert('Please Enter Correct Detail:')
        }
    }


    return (
        <div className='login'>
            <h1>Login</h1>
            <input className='inputBox' type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className='inputBox' type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className='appButton' type="submit" onClick={handleLogin}>LogIn</button>
        </div>
    )
}

export default Login;