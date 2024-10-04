import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
const Nav = () => {
  const auth = localStorage.getItem('user');
  // console.log('auth', );
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    Navigate('/login');
  }
  return (
    <div>
      {
        auth ?
          <ul className='nav-ul'>
            <li><Link to='/'>Products</Link></li>
            <li><Link to='/add'>Add Products</Link></li>
            {/* <li><Link to='/update'>Update Products</Link></li> */}
            {/* <li><Link to='/profile'>Profile</Link></li> */}
            <li><Link to='/logout' onClick={logout}>Logout({JSON.parse(auth).name})</Link></li>
          </ul> :
          <ul className='nav-ul nav-right'>
            <li><Link to='/signup'>SignUp</Link></li>
            <li><Link to='/login'>Login</Link></li>
          </ul>
      }


    </div>
  )
}

export default Nav