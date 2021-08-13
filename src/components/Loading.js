import React from 'react';
import Spinner from 'react-spinner-material';

const Loading = () => (
  <div className='loading_errors'>
      <h3>Loading</h3>
      <Spinner size={340} color={"#333"} radius={120} visible={true} />
  </div>
);

export default Loading 