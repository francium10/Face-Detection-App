// Rank.js
import React from 'react';

const Rank = ({name, entries }) => {

  return (
    <div className='rank'>
      <h1 className='f1 tc purple'>{`${name},`}</h1>
      <h2 className='f2 tc purple'>Your current entry count is:</h2>
      <div className='f2 tc purple'>{entries}</div>
    </div>
  );
};

export default Rank;

