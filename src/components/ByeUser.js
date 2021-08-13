import React, {useState} from 'react';
import { Headline3} from '@material/react-typography';
import '@material/react-typography/dist/typography.css';
import { Redirect } from 'react-router-dom';

const ByeUser = () => {
  const [goHome, setGoHome] = useState(false);

  const handleReturn = () => {
    setGoHome(!goHome)
  }
  return(
    <div className='loading_errors'>
      <Headline3>See you soon</Headline3>
      <button type='button' onClick={handleReturn}>Return Home</button>
      {goHome && <Redirect to='/' />}
    </div>
  );
}

export default ByeUser;