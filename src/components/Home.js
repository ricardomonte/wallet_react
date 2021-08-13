import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import HomeStyle from '../styles/Home.module.css';

const Home = () => {
  const [authenticated, setAuthenticated] = useState(false)

  const readCookie = () => {
    if(document.cookie.indexOf('user') > -1) {
      setAuthenticated(true);
    }
  }
  useEffect(() => {
    readCookie()
  }, [])

  if(authenticated) {

    return <Dashboard />
  }
  return(
    <>
    <div className={HomeStyle.container}>
      <h1 className={HomeStyle.willwallet}>WilliWallet</h1>
      <div className={HomeStyle.containerLink}>
        <Link to="/sign_up" className={HomeStyle.link}>
          Sign Up
        </Link>
      </div>
      <div className={HomeStyle.containerLink}>
        <Link to="/sign_in" className={HomeStyle.link}>
          Sign In
        </Link>
      </div>
    </div>
  </>
  )
}

export default Home