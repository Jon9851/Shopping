import React from 'react';
import './NewsLetter.css';

const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>

      {/* Separate input and button into two different containers */}
      <div className='input-wrapper'>
        <input type="email" placeholder='Your Email id' />
      </div>
      <div className='button-wrapper'>
        <button>Subscribe</button>
      </div>
    </div>
  );
}

export default NewsLetter;
