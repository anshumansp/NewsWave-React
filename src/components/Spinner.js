import React from 'react';
import loading from '../loading.gif';

const Spinner = () => {
    return (
      <div className='m-20 flex flex-column justify-center align-center'>
        <img className="h-56 m-6" src={loading} alt="loading" />
      </div>
    )
}

export default Spinner