import React, { useState } from 'react'
import { AccountProvider } from '../context/AccountContext';
import useFetch from '../customeHook/useFetch'
import BtcAmount from './BtcAmount';
import PriceBtc from './PriceBtc';
import UsdAmount from './UsdAmount';
import Loading from './Loading';
import Errors from './Error';
import MyTransactions from './MyTransactions';
import TopBar from './TopBar';
import { Link } from 'react-router-dom';
import DashStyle from '../styles/Dashboard.module.css';

const url = 'https://willywalletapi.herokuapp.com/api/v1/accounts';
const requestOptions = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json', 'Origin': 'https://willywallet.herokuapp.com/' },
};


const Dashboard = () => {
  const [showTransaction, setShowTransaction] = useState(false)

  const {loading, data, error } = useFetch(url, requestOptions )
  if (loading) return (<Loading />);
  if (error) return (<Errors />);
  const transactionChange = () => {
    if (showTransaction === false) {
      setShowTransaction(true)
    } else {
      setShowTransaction(false)
    }
  }
  return (
    <AccountProvider>
      <div className={DashStyle.contentDash}>
        <TopBar userName={data?.accounts?.user?.name} />
        {data
          &&
          <div className={DashStyle.contentAll}>
            <div>
              <PriceBtc />
            </div>
            <div className={DashStyle.contentCoins}>
              <UsdAmount usdAmount={data?.accounts.amount_usd} />
              <BtcAmount btcAmount={data?.accounts.amount_btc} />
            </div>
            <div className={DashStyle.contentTransaction}> 
              <MyTransactions />
            </div>
          </div>
        }
        <button type="button" onClick={transactionChange} className={DashStyle.btn}><Link to="/transaction" className={DashStyle.link}>New Transaction</Link></button> 
      </div>
    </AccountProvider>
  );
}

export default Dashboard;