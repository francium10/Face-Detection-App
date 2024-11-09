import React, { useState } from "react";

const Register = ({ handleRoute,handleLoadUser }) => {
  // State for form data and error messages
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });

  // Update formData with input values
  const handleRegisterChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on field change
  };

  // Validation and form submission
  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Update error state to show messages on the form
      return; // Stop submission if errors are found
    }

    // Send POST request if no errors
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(user => {
        if (user) { // Confirm user was added
          handleLoadUser(user);
          handleRoute('home'); // Navigate to 'home' route
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-3">
      <main className="pa4 black-80">
        <form className="measure centre" onSubmit={handleRegisterSubmit}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>

            {/* Name field */}
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleRegisterChange}
              />
              {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
            </div>

            {/* Email field */}
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleRegisterChange}
              />
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </div>

            {/* Password field */}
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleRegisterChange}
              />
              {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
            </div>
          </fieldset>

          <div>
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
            />
          </div>
        </form>
      </main>
    </article>
  );
};

export default Register;
