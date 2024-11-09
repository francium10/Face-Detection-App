import React from 'react';
// import SignIn from '../SignIn/SignIn';

const Navigation = ({ handleRoute, isSignedIn }) => {
  return (
    <nav className='tc absolute right-0 top-0'>
      {isSignedIn ? (
        <a
          className='f6 fl grow hover-bg-purple hover-white b--purple link ba dib purple pa4 ma2 pv2'
          href='#0'
          onClick={() => handleRoute('SignOut')}
        >
          Sign Out
        </a>
      ) : (
        <>
          <a
            className='f6 fl grow hover-bg-purple hover-white b--purple link ba dib purple pa4 ma2 pv2'
            href='#0'
            onClick={() => handleRoute('SignIn')}
          >
            Sign In
          </a>
          <a
            className='f6 fl grow hover-bg-purple hover-white b--purple link ba dib purple pa4 ma2 pv2'
            href='#0'
            onClick={() => handleRoute('register')}
          >
            Register
          </a>
        </>
      )}
    </nav>
  );
};

export default Navigation;

