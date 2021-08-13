import React from 'react';
import LogOut from './LogOut';
import TopBarStyle from '../styles/TopBar.module.css'

const TopBar = ({userName}) => (

  <div className={TopBarStyle.topBar}>
    <h2 className={TopBarStyle.text}>
      Welcome to your WillyWallet
    </h2>
    <div className={TopBarStyle.userBtnContainer}>
      <h3 className={TopBarStyle.text}>{userName}</h3>
      <LogOut />
    </div>
  </div>
);

export default TopBar;