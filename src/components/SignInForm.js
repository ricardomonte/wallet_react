import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormStyle from '../styles/Forms.module.css';

const url = 'https://willywalletapi.herokuapp.com/api/v1/sign_in';

const SignInForm = () => {

  const [error, setError] = useState();
  const [data, setData] = useState();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const notificationError = () => toast.error(error ? error : "Email or Password missing")
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(user)
  };


  const handleChange = (event) => {
    const updateUser = { ...user, [event.target.name]: event.target.value };
    setUser(updateUser);
  };

  const handleValidation = () => {
    const valuesUser = Object.values(user)
    if (valuesUser.some((val) => val === '')) {
      notificationError()
      return 
    }
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.message === 'User not found') {
          throw new Error(data.message) 
        } else {
          setData(data)
          setError(null)
        }
      })
      .catch((e) => {
        setError(e.message);
        setData(null)
        notificationError()
      })
  };
  return (
    <>
      <div className={FormStyle.containerTotal}>
        <form className={FormStyle.container}>
          <label htmlFor="email" className={FormStyle.label}>
            Email:
            <input className={FormStyle.inputs} id="email" type="email" value={user.email} name="email" onChange={handleChange} placeholder="Your email" />
          </label>
          <label htmlFor="password" className={FormStyle.label}>
            Password:
            <input className={FormStyle.inputs} id="password" type="password" value={user.password} name="password" onChange={handleChange} placeholder="Your password" />
          </label>
          <button type="button" onClick={handleValidation} className={FormStyle.btn}>Submit</button>
        </form>
      </div>
    <ToastContainer position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover />
      {data?.message === 'Sign in successful' ? <Redirect to="/" /> : null }
    </>
  );
};

export default SignInForm;