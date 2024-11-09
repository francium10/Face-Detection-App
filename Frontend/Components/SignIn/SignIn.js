import React, { useState } from 'react';

const SignIn = ({ handleRoute,handleLoadUser}) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Add error state

  const handleSignInEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSignInPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignInButtonSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    setError(''); // Reset error on submit

    fetch('http://localhost:3000/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then((response) => {
      if (response.ok) {
        return response.json(); // If status is 200, proceed
      } else {
        throw new Error('Invalid email or password'); // If status is 400, throw an error
      }
    })
    .then((user) => {
      handleRoute('home');
      handleLoadUser(user);
    })
    .catch((error) => {
      setError(error.message); // Display error message
    });
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-3">
      <main className="pa4 black-80">
        <form className="measure center" onSubmit={handleSignInButtonSubmit}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                value={email}
                onChange={handleSignInEmail}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handleSignInPassword}
              />
            </div>
            {error && <p className="red">{error}</p>} {/* Display error message */}
          </fieldset>
          <div>
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
        </form>
      </main>
    </article>
  );
};

export default SignIn;
