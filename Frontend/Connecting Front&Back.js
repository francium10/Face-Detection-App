// Step one is making sure both frontend and backend are running on localhost
// step two install the cors cross origin resource sharing to ensure things run well from backend
// npm install cors
// const cors = require('cors'); or import cors from 'cors'
// app.use(cors({ origin: 'http://your-frontend-url.com' }));

import SignIn from "./Components/SignIn/SignIn";

// Get the url/Endpoint from backend and use it in front end to set things up
// in our case we start with "http://localhost:3000/" 

// For a start, we just want to use to make sure our frontend be connected to our backend
// for that, on our frontend we do a useEffect() method to fetch our data 

// Backend
app.get('/',(req,res)=>{
    res.json(database.users)
});

// Frontend 
useEffect(()=>{
    fetch('http://localhost:3000/')
    .then(response=>response.json())
    .then(data=>console.log(data))
    },[]);
//  this should print the 2 arrays from our database.user
// arrays 

// SignIn/ Endpoint
// Once the above works,we now start planning how we will send the password and email 
// to our backend on which the backend which check against all that is in the database and if the user is present
// will give us a response other wise we will get an error message.. just like we tasted post man
// how do we do this ?
// The best is just making the SignIn component smart by giving it its own state 
// import React, { useState } from 'react';

import React, { useState } from 'react';

const SignIn = ({ handleRoute }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Add error state

  const handleSignInEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleSignInPassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSignInButtonSubmit = (event) => {
    event.preventDefault(); // Prevent page refresh
    setError(''); // Reset error on submit

    fetch('http://localhost:3000/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data === 'success') {
        handleRoute('home');
      } else {
        setError('Invalid email or password'); // Set error message
      }
    })
    .catch(error => {
      setError('An error occurred. Please try again.');
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

// BACKEND
// SIGNING ENDPOINT
// Looping through signIn
app.post('/signIn', (req, res) => {
    const { email, password } = req.body;
    const user = database.users.find(user => user.email === email && user.password === password);
    if (user) {
      res.json('success');
    } else {
      res.status(400).json('error');
    }
  });

//   Next is the registration end point 




// Next is The image endpoint 
// What we want is when, we submit our image url the count should be incremented and the records 
// should be kept within each user profile 
// where do we start from ?? lets start by going to the handle submit function and then plan how 
// we will make the logic for incrementing.
// In our onButtonSubmit we want when we get a response from clarify API, we also want to fetch the data from 
// backend that will update our users count and we only need the id in user for that
// .then(response => response.json())
// .then(response=>calculateFaceLocation(response))
// .then(fetch("http//:localhost:3000/image",{
//   method: 'PUT',
//   headers: { 'Content-Type': 'application/json'},
//   body: JSON.stringify(id)
// }))


// Backend 
app.put('/image', (req, res) => {
  const { id } = req.body;
  const user = database.users.find(user => user.id === parseInt(id));
  if (user) {
    user.entries++;
    return res.json(user.entries);
  } else {
    return res.status(404).json('sorry not found');
  }
});