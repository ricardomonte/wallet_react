import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import Errors from './Error';
import LogoutStyle from '../styles/Logout.module.css'

const url = 'http://localhost:4000/api/v1/sign_out';
const requestOptions = {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
};



const LogOut = () => {
  const [data, setData] = useState()
  const [error, setError] = useState()

  const handleLogout = () => {
    let isLoading = true;
    fetch(url, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      if (isLoading) {
        setData(data);
        setError(null);
      }
    })
    .catch((e) => {
      if (isLoading) {
        setError(e);
        setData(null);
      }
    });
    return () => (isLoading = false)
  }
  return (
    <>
      <button className={LogoutStyle.btn} type='button' onClick={handleLogout}>Logout</button>
      {data?.status === 'OK' ? <Redirect to='/logout' /> : null}
      {error?.status === 'Sesion not found' ? <Errors /> : null}
    </>

  )
}

export default LogOut;
