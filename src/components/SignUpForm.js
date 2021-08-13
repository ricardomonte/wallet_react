import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormStyle from '../styles/Forms.module.css';

const url = 'https://willywalletapi.herokuapp.com/api/v1/sign_up';

const SignUpForm = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
  });

  const notificationError = () => toast.error(error ? error : "One or more parameters are empty")
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
    axios.post(url, user)
      .then(response => {
        localStorage.setItem('token', response.headers['access-token']);
      })
      .then(data => {
        if (data.message === "User couldnt be created") {
          throw new Error(data.message) 
        } else {
          setData(data)
          setError(null)
        }
      })
      .catch((e) => {
        setError(e.message)
        setData(null)
        notificationError()
      })
  };
  return (
    <div className={FormStyle.containerTotal}>
      <form className={FormStyle.container}>
        <label htmlFor="name" className={FormStyle.label}>
          Firstname:
          <input className={FormStyle.inputs} id="name" type="text" value={user.name} name="name" onChange={handleChange} placeholder="Your firstname" />
        </label>
        <label htmlFor="lastname" className={FormStyle.label}>
          Lastname:
          <input className={FormStyle.inputs} id="lastname" type="text" value={user.lastname} name="lastname" onChange={handleChange} placeholder="Your lastname" />
        </label>
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
      <ToastContainer position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover />
      {data?.message === 'User successfully created' ? <Redirect to='/' /> : null }
    </div>
  );
};

export default SignUpForm;