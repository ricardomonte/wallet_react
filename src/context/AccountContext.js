import React, {createContext, useState, useEffect, useContext } from 'react'

const url = 'https://willywalletapi.herokuapp.com/api/v1/accounts';
const AccountContext = createContext({});


export const AccountProvider = ({children}) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    let isLoading = true
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    };
    fetch(url, requestOptions)
      .then(response => response.json())
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

