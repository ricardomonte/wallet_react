
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import Errors from './Error';
import UsdAmount from './UsdAmount';
import BtcAmount from './BtcAmount';
import TopBar from './TopBar';
import calculateAmount from '../util/calculateAmount';
import useFetch from '../customeHook/useFetch';
import 'react-toastify/dist/ReactToastify.css';
import DashStyle from '../styles/Dashboard.module.css';
import FormStyle from '../styles/Forms.module.css';
import TranStyle from '../styles/TransacForm.module.css';
const formatCurrency = require('format-currency')

const url = 'https://willywalletapi.herokuapp.com/api/v1/transactions';
const urld = 'https://willywalletapi.herokuapp.com/api/v1/accounts';
const requestOptionsD = {
  method: 'GET'
};


const TransactionForm = () => {

  const { loading, data, error } = useFetch(urld, requestOptionsD)

  const [message, setMessage] = useState(null);
  const [userTransaction, setUserTransaction] = useState({
    coin_to_send: '',
    coin_to_receive: '',
    amount_send: '',
    amount_receive: '',
    user_id: 0,
  });

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(userTransaction)
  };


  
  const resetAmount = () => {
    const resetAmount = { ...userTransaction, amount_send: '0', amount_receive: '0'};
    setUserTransaction(resetAmount);
  }


  const handleSendCoinChange = (event) => {
    const updateUser = { ...userTransaction, coin_to_send: event.target.value, coin_to_receive: event.target.value === 'USD' ? 'BTC' : 'USD', user_id: data.accounts.user_id };
    setUserTransaction(updateUser);
  };

  const handleSendAmountChange = (event) => {
    if (userTransaction.coin_to_send === '') {
      resetAmount()
      return
    }
    if ((userTransaction.coin_to_send === 'USD' && parseFloat(event.target.value) > parseFloat(data.accounts.amount_usd))
      ||
      (userTransaction.coin_to_send === 'BTC' && parseFloat(event.target.value) > parseFloat(data.accounts.amount_btc))) {
        resetAmount()
        return
    }
    const updateUser = { ...userTransaction, [event.target.name]: event.target.value, amount_receive: calculateAmount(data.accounts.value_btc.bpi.USD.rate_float, userTransaction.coin_to_send, event.target.value)};
    setUserTransaction(updateUser);
  };

  const AmountDisplay = userTransaction.coin_to_send === 'USD'
                        ?
                        formatCurrency(userTransaction.amount_receive, { format: '%v %c', code: 'BTC', minFraction: 8, maxFraction: 8  })
                        :
                        formatCurrency(userTransaction.amount_receive, { format: '%s%v %c', code: 'USD', symbol: '$' })

  
  const handleSubmit = () => {

    const valuesTransaction = Object.values(userTransaction)
    if (valuesTransaction.some((val) => val === '')) {
      return
    }
    const updateUser = { ...userTransaction, amount_receive: userTransaction.coin_to_send === 'USD'
                        ? userTransaction.amount_receive
                        : userTransaction.amount_receive.toFixed(2)
                      };
    setUserTransaction(updateUser)
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => setMessage(data))
      .catch((e) => console.error(e))
  }

  if (loading) return (<Loading />);
  if (error) return (<Errors />);
  return (
    <div>
      <TopBar userName={data?.accounts?.user.name} />
      <div className={DashStyle.contentCoins}>
        <UsdAmount usdAmount={data?.accounts.amount_usd} />
        <div className={TranStyle.received}>
          <h1>You will receive</h1>
          <h2>{AmountDisplay}</h2>
        </div>
        <BtcAmount btcAmount={data?.accounts.amount_btc} />
      </div>
      <div className={TranStyle.containerTotal}>
        <form className={FormStyle.container}>
          <label htmlFor="sendCoin" className={FormStyle.label}>
            Send
            <select
              id="sendCoin"
              name="coin_to_send"
              value={userTransaction.coin_to_send}
              onChange={handleSendCoinChange}
              className={FormStyle.inputs}
            >
              <option value="" disabled>
                Coin
              </option>
              {['USD', 'BTC'].map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="receiveCoin"  className={FormStyle.label}>
            Receive
            <select
              id="receiveCoin"
              name="coin_to_receive"
              value={userTransaction.coin_to_receive}
              readOnly={true}
              className={FormStyle.inputs}
            >
              <option value="" disabled>
                Coin
              </option>
              <option value={userTransaction.coin_to_send === 'USD' ? 'BTC' : 'USD'}>
                {userTransaction.coin_to_send === 'USD' ? 'BTC' : 'USD' }
              </option>
            </select>
          </label> 
          <label htmlFor="amountReceive"  className={FormStyle.label}>
            Amount to send:
            <input className={FormStyle.inputs} id="amountReceive" type="number" value={userTransaction.amount_send} name="amount_send" onChange={handleSendAmountChange} placeholder="amount to send" />
          </label>
          <button type="button" onClick={handleSubmit} className={FormStyle.btn}>Submit</button>
        </form>
      </div>
      {message?.message === 'transaction successed' && <Redirect to="/" />}
    </div>
  );
};

export default TransactionForm;