import React, {createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios';

const url = 'https://willywalletapi.herokuapp.com/api/v1/accounts';
const AccountContext = createContext({});


export const AccountProvider = ({children}) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    const auth = localStorage.token;
    let isLoading = true

      

    axios.get(url, {
      headers: { 'Authorization': `Bearer ${auth}`, 'Access-Control-Allow-Origin': '*',  'Content-Type': 'application/json' }
    }).then(response => response.json())
      .then(data => isLoading && setData(data.accounts))
      .catch((e) => isLoading && setError(e))
    return () => (isLoading = false)
  }, [])
  return (
    <AccountContext.Provider value={{data, error}}>
      {children}
    </AccountContext.Provider>
  )
}

export const useAccount = () => useContext(AccountContext);

