import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import Errors from './Error';
import LogoutStyle from '../styles/Logout.module.css'

const url = 'https://willywalletapi.herokuapp.com/api/v1/sign_out';
const requestOptions = {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json', 'Origin': 'https://willywallet.herokuapp.com/' },
  credentials: 'include',
};



const LogOut = () => {
  const [data, setData] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token');
    setData(true)
  }
  return (
    <>
      <button className={LogoutStyle.btn} type='button' onClick={handleLogout}>Logout</button>
      { data && <Redirect to='/logout' /> }

    </>

  )
}

export default LogOut;
