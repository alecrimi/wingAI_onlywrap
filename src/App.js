// App.js
import React, { useState } from 'react'; // Make sure to import useState
 //import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import stripePromise from './Stripe';
import Login from './Login';

function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleCheckout = async (priceId) => {
    try {
      const email = document.getElementById("emailInput").value; // Get the email from the input field
      const password = document.getElementById("passwordInput").value; // Get the password from the input field

      if (!email || !password) {
        alert("Please enter both email and password");
        return;
      }

      const response = await fetch('http://localhost:5000/api/create-checkout-session', { // Update this URL to your backend endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId, email }), // Send both priceId and email to the backend
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { id } = await response.json(); // Make sure the response has an 'id' field
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/login">If already registered click here</Link>
        </nav>

        <div className="signup-options">
      <h2>Select Your Plan</h2>
     
      <div>
  <input
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    id="emailInput" // Optional: Add ID for styling purposes (not used for value retrieval)
    required
  />
  <input
    type="password"
    placeholder="Enter your password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    id="passwordInput" // Optional: Add ID for styling purposes (not used for value retrieval)
    required
  />
</div>

      <div className="signup-images">
        <img
          src="image1.jpg" // Replace with the URL or path of your first image
          alt="Signup Option 1"
          style={{ width: '300px', height: '300px', margin: '10px', cursor: 'pointer' }}
          onClick={() => handleCheckout('monthly8usd')} // Replace with your actual price ID
        />
        <img
          src="image2.jpg" // Replace with the URL or path of your second image
          alt="Signup Option 2"
          style={{ width: '300px', height: '300px', margin: '10px', cursor: 'pointer' }}
          onClick={() => handleCheckout('yearly80usd')} // Replace with your actual price ID
        />
      </div>
    </div>

        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
