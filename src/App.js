import React, { useState } from 'react';
import supabase from './supabaseClient';
import stripePromise from './Stripe';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [tempUser, setTempUser] = useState(null); // Temporary user info

  const handleSignUp = async () => {
      try {
          // Store the temporary user information
          setTempUser({ email, password });

          // Proceed to payment
          await handleCheckout();
      } catch (error) {
          setError(error.message);
      }
  };
 

  const handleCheckout = async () => {
      try {
          const response = await fetch('http://localhost:5000/api/create-checkout-session', {
              method: 'POST',
              body: JSON.stringify({ email }),
              headers: { 'Content-Type': 'application/json' },
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response from server:', errorText);
            throw new Error('Failed to create checkout session');
        }

        const { id } = await response.json(); // Make sure the response has an 'id' field
        const stripe = await stripePromise;

        // Pass the sessionId to redirectToCheckout
        const { error } = await stripe.redirectToCheckout({ sessionId: id });
        if (error) throw error; // Handle the error if redirect fails
    } catch (error) {
        console.error('Checkout Error:', error);
        setError(error.message); // Set error state to show in UI
    }
};

  const handlePaymentSuccess = async (sessionId) => {
      try {
          const response = await fetch(`http://localhost:5000/api/payment-status?session_id=${sessionId}`);
          const { success } = await response.json();

          if (success) {
              // Only create the user if the payment was successful
              const { data, error } = await supabase.auth.signUp({
                  email: tempUser.email,
                  password: tempUser.password,
              });
              if (error) throw error;

              setUser(data.user); // Set the confirmed user
          } else {
              setError('Payment was not successful.');
          }
      } catch (error) {
          setError(error.message);
      }
  };

  
  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      console.log('Login Response:', { data, error });
      if (error) throw error;
      setUser(data.user);
    } catch (error) {
      setError(error.message);
    }
  };

   
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) setError(error.message);
    else setUser(null);
  };

  return (
    <div className="App">
       {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignUp}>Sign Up</button>
          <button onClick={handleLogin}>Login</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
      )}
    </div>
  );
}

export default App;  // Ensure this line is present