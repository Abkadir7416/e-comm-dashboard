import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { json } from 'react-router-dom';

const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/')
    }
  })

  const collectData = async () => {
    console.log(name)
    // alert("collecting data")
    // In Below method we are sending data of sign up to node server;
    // console.log(name, email, password)
    try { 
      let result = await fetch('http://localhost:4000/register', {
        method: 'post',
        body: JSON.stringify({ name, email, password }), // these data are send to node server;
        headers: {
          'Content-Type': 'application/json'
        },
      })
      result = await result.json();
      localStorage.setItem("user", JSON.stringify(result))
      navigate('/')
      
    } catch (error) {
      console.log('error ', error);
    }
  }

  return (
    <div className='register'>
      <h1>Register</h1>
      {/* doubt:// why we are giving value */}
      <input className='inputBox' type="text" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
      <input className='inputBox' type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className='inputBox' type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className='appButton' type="submit" onClick={collectData}>SignUp</button>
    </div>
  )
}

export default SignUp;