import React from 'react';
import { useAccount } from '../context/AccountContext';
import { Headline3} from '@material/react-typography';
import '@material/react-typography/dist/typography.css';
import PriceStyle from '../styles/Price.module.css';
import calculateAmount from '../util/calculateAmount';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
const formatCurrency = require('format-currency');

const PriceBtc = () => {
  const { data } = useAccount()

  const amountPriceBtc = calculateAmount(data?.value_btc.bpi.USD.rate_float, "USD", 1)
  return(
    <Carousel autoPlay={true} infiniteLoop={true} showArrows={false} showIndicators={false} interval={5000} transitionTime={5000} showThumbs={false}>
      <div className={PriceStyle.content}>
        <Headline3 className={PriceStyle.price}>
          1 BTC =
        </Headline3>
        <Headline3 className={PriceStyle.price}>
          {formatCurrency(data?.value_btc.bpi.USD.rate_float, { format: '%s%v %c', code: 'USD', symbol: '$' })}
        </Headline3>
      </div>
      <div className={PriceStyle.content}>
        <Headline3 className={PriceStyle.price}>
          1 USD =
        </Headline3>
        <Headline3 className={PriceStyle.price}>
          {formatCurrency(amountPriceBtc, { format: '%v %c', code: 'BTC', minFraction: 8, maxFraction: 8 })}
        </Headline3>
      </div>
    </Carousel>
  );
} 

export default PriceBtc;