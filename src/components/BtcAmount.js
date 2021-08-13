import React from 'react';
import Card, { CardPrimaryContent } from "@material/react-card";
import { Headline5, Headline6 } from '@material/react-typography';
import '@material/react-typography/dist/typography.css';
import '@material/react-card/dist/card.css';
import CoinStyle from '../styles/Coins.module.css'
const formatCurrency = require('format-currency')

const BtcAmount = ({btcAmount}) => {
  const amount = formatCurrency(btcAmount,  { format: '%v %c', code: 'BTC', minFraction: 8, maxFraction: 8  })
  return (
    <Card className={`mdc-elevation--z4 ${CoinStyle.content_size}`}>
      <CardPrimaryContent className={CoinStyle.cardContent}><Headline6>Available funds:</Headline6></CardPrimaryContent>
      <CardPrimaryContent className={CoinStyle.cardContent}><Headline5>{amount}</Headline5></CardPrimaryContent>
    </Card>
  )
}

export default BtcAmount;