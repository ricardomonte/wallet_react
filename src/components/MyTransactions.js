import React from 'react';
import { Headline3} from '@material/react-typography';
import '@material/react-typography/dist/typography.css';
import useFetch from '../customeHook/useFetch';
import Loading from './Loading';
import Errors from './Error';
import MyTransactionStyle from '../styles/DetailTrans.module.css'
const formatCurrency = require('format-currency')

const url = 'http://localhost:4000/api/v1/transactions';
const requestOptions = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json', 'Origin': 'https://willywallet.herokuapp.com/' },
};

const MyTransactions = () => {
  const {loading, data, error } = useFetch(url, requestOptions)
  if (loading) return (<Loading />);
  if (error) return (<Errors />);
  const format = (coin) => {
    let conf
    if (coin === 'USD') {
      conf =  { format: '%s%v %c', code: 'USD', symbol: '$' }
    } else {
      conf = { format: '%v %c', code: 'BTC', minFraction: 8, maxFraction: 8 }
    }
    return conf
  }
  return (
    <div>
      {data?.transactions?.length === 0
        ?
        <div className={MyTransactionStyle.noTransaction}>
          <Headline3>You dont have transactions</Headline3>
        </div>
        :
        <table className={MyTransactionStyle.w40} align='center'>
          <thead>
            <tr>
              <th>N&deg;</th>
              <th>Coin Send</th>
              <th>Coin Receive</th>
              <th>Amount Sended</th>
              <th>Amount Received</th>
            </tr>
          </thead>
          <tbody align='center'>
            {data?.transactions?.map((transaction, index) => (
                <tr key={transaction.id} className={MyTransactionStyle.separation}>
                  <td className={MyTransactionStyle.separation}>{index + 1}</td>
                  <td className={MyTransactionStyle.separation}>{transaction.coin_to_send}</td>
                  <td className={MyTransactionStyle.separation}>{transaction.coin_to_receive}</td>
                  <td className={MyTransactionStyle.separation}>{formatCurrency(transaction.amount_send, format(transaction.coin_to_send)) }</td>
                  <td className={MyTransactionStyle.separation}>{formatCurrency(transaction.amount_receive, format(transaction.coin_to_receive)) }</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      }
    </div>
  )
}

export default MyTransactions;