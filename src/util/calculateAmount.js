const calculateAmount = (price, sendCoin, amountSend) => {
  let receiveAmount;
  if (sendCoin === 'USD') {
    receiveAmount = amountSend / price
  } else {
    receiveAmount = amountSend * price
  }
  return receiveAmount
}

export default calculateAmount