import React, { useState,useEffect } from 'react'; 
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import supabase from './supabaseClient';
import stripePromise from './Stripe';

import Cancel from './cancel';

import './css/tailwind-build.css'; // Include any required CSS
import './css/index.css'; // Include any additional styles
import AnimatedLandingPage from './animated-landing-template';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [selectedPriceType, setSelectedPriceType] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('initial'); // 'initial', 'processing', 'success', 'error'

  useEffect(() => {
    // Check URL parameters when component mounts
    const params = new URLSearchParams(window.location.search);
    const session_id = params.get('session_id');
 
    const email = params.get('email');

    const password = params.get('password');

    console.log("Verifying payment for session ID:", session_id);

    //if (session_id && showSignupForm) {
      if (session_id  ) {

      console.log('pre-verify')
      console.log(email)
      verifyPayment(session_id,email,password);
    }
  }, [showSignupForm,email,password]);

  const verifyPayment = async (sessionId, email,password) => {
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, email,password }),  // Send both sessionId and email
      });
  
      const data = await response.json();
      if (data.success) {
        console.log('Payment successful');
      } else {
        console.log('Payment not successful');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  };

  const handleSignUp = async () => {
    try { 
      //const { user, error } = await supabase.auth.signUp({ email, password });
      //if (error) throw error;

      //setUser(user);
       // Store the user data temporarily (you might want to use state or context for this)

      // Redirect to Stripe checkout after successful signup
      handleCheckout();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setUser(data.user);  
 
    //window.location.href = 'http://localhost:3001/proxy'; // Redirect to your proxy endpoint   
    window.location.href = '/api/proxy'; 

    
    // If login is successful, make a request to the backend to handle the redirection
    //const response = await fetch('http://localhost:3000/redirect', {
    // method: 'GET',
     
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCheckout = async () => {
    try {
      // Fetch the checkout session ID from the server
      //const response = await fetch('http://localhost:3001/api/create-checkout-session', {
      console.log('before checkout')
      console.log(email)
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceType: selectedPriceType,
          email, password,
          //metadata: { email, password }, // Don't reset
            //email: email,
            //password: password //Be careful

        }),
      });
  
      // Check if the response is ok
      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }
  
      // Parse the response body only once
      const { id: sessionId } = await response.json();
  
      // Wait for the Stripe object to be initialized
      const stripe = await stripePromise;
      console.log('Paying');
      // Redirect to Stripe Checkout with the session ID
      const { error } = await stripe.redirectToCheckout({
         sessionId,  // Pass the session ID here
      });
     
      // Handle errors in redirection
      if (error) {
        throw error;
      }
    } catch (error) {
      setError(error.message);
    }
  };
   
 
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) setError(error.message);
    else setUser(null);
  };

  if (showSignupForm) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
        <div className="tw-w-full tw-max-w-md tw-p-8 tw-rounded-lg tw-bg-gray-800 tw-shadow-lg">
          {paymentStatus === 'success' ? (
            <div className="tw-text-center tw-text-gray-200">
              <h2 className="tw-text-2xl tw-mb-4">Payment Successful!</h2>
              <p>Your account has been created.</p>
              <p>Redirecting to dashboard...</p>
            </div>
          ) : paymentStatus === 'processing' ? (
            <div className="tw-text-center tw-text-gray-200">
              <h2 className="tw-text-2xl tw-mb-4">Processing Payment</h2>
              <p>Please wait while we verify your payment...</p>
            </div>
          ) : (
            <>
              <h2 className="tw-text-3xl tw-font-semibold tw-text-gray-200 tw-mb-6 tw-text-center">
                Sign Up for {selectedPriceType === 'monthly' ? 'Monthly' : 'Yearly'} Plan
              </h2>
              <div className="tw-space-y-4">
                <div className="tw-text-gray-300 tw-text-center tw-mb-4 tw-whitespace-pre-line">
                  You are just one step-away. Create your account to get started!<br />
                  By signing up, you agree to our Terms of Service and Privacy Policy.<br />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="tw-w-full tw-p-3 tw-rounded tw-bg-gray-700 tw-border tw-border-gray-600 focus:tw-border-purple-500 focus:tw-outline-none"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="tw-w-full tw-p-3 tw-rounded tw-bg-gray-700 tw-border tw-border-gray-600 focus:tw-border-purple-500 focus:tw-outline-none"
                />
                <button
                  onClick={handleSignUp}
                  disabled={paymentStatus === 'processing'}
                  className="tw-w-full tw-p-3 tw-rounded tw-bg-purple-600 tw-text-white hover:tw-bg-purple-700 tw-transition-colors disabled:tw-opacity-50"
                >
                  Create Account
                </button>
                <button
                  onClick={() => {
                    setShowSignupForm(false);
                    setEmail('');
                    setPassword('');
                    setError(null);
                    setPaymentStatus('initial');
                  }}
                  className="tw-w-full tw-p-3 tw-rounded tw-bg-gray-700 tw-text-gray-200 hover:tw-bg-gray-600 tw-transition-colors"
                >
                  Back to Main Page
                </button>
              </div>
              {error && (
                <p className="tw-mt-4 tw-text-red-500 tw-text-center">{error}</p>
              )}
              {paymentStatus === 'error' && (
                <p className="tw-mt-4 tw-text-red-500 tw-text-center">
                  There was an error processing your payment. Please try again.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
  return (
    
    <div className="App">
 
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <div className="tw-flex tw-flex-col max-md:tw-flex-col-reverse tw-items-center tw-justify-center tw-gap-[20px] tw-h-screen tw-mx-4 tw-text-base">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="tw-p-2 tw-border tw-rounded     md:tw-w-1/2"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="tw-p-2 tw-border tw-rounded   md:tw-w-1/2"
            />
          <button
  aria-label="login"
  onClick={(e) => {
    e.preventDefault();
    handleLogin();
  }}
  className="btn tw-bg-[#7e22ce85] tw-shadow-lg tw-shadow-primary tw-transition-transform tw-duration-[0.3s] hover:tw-scale-x-[1.03]"
>
  <span>LogIn</span>
</button>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
      )}

      <AnimatedLandingPage />

      <section className="tw-mt-5 tw-flex tw-w-full tw-flex-col tw-place-items-center tw-p-[2%]" id="pricing">
        <h3 className="tw-text-3xl tw-font-medium tw-text-gray-300 max-md:tw-text-2xl">
          Choose Your Plan
        </h3>

        <div className="tw-mt-10 tw-flex tw-flex-wrap tw-place-content-center tw-gap-8 max-lg:tw-flex-col">
          <div className="reveal-up tw-flex tw-w-[380px] tw-flex-col tw-place-items-center tw-gap-2 tw-rounded-lg tw-border-[1px] tw-border-outlineColor tw-bg-secondary tw-p-8 tw-shadow-xl max-lg:tw-w-[320px]">
            <h3>
              <span className="tw-text-5xl tw-font-semibold tw-text-gray-400">$9</span>
              <span className="tw-text-2xl tw-text-gray-400">/month</span>
            </h3>
            <p className="tw-mt-3 tw-text-center tw-text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, explicabo!
            </p>
            <hr />
            <ul className="tw-mt-4 tw-flex tw-flex-col tw-gap-2 tw-text-center tw-text-lg tw-text-gray-200">
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem, ipsum.</li>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem ipsum dolor sit.</li>
            </ul>
            <button
              onClick={() => {
                setShowSignupForm(true);
                //setEmail('');
                //setPassword('');
                setError(null);
                setSelectedPriceType('monthly');
              }}
              className="btn tw-mt-8 !tw-w-full tw-transition-transform tw-duration-[0.3s] hover:tw-scale-x-[1.02]"
            >
              Sign Up
            </button>
          </div>

          <div className="reveal-up tw-flex tw-w-[380px] tw-flex-col tw-place-items-center tw-gap-2 tw-rounded-lg tw-border-2 tw-border-primary tw-bg-secondary tw-p-8 tw-shadow-xl max-lg:tw-w-[320px]">
            <h3>
              <span className="tw-text-5xl tw-font-semibold tw-text-gray-400">$49</span>
              <span className="tw-text-2xl tw-text-gray-400">/year</span>
            </h3>
            <p className="tw-mt-3 tw-text-center tw-text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, explicabo!
            </p>
            <hr />
            <ul className="tw-mt-4 tw-flex tw-flex-col tw-gap-2 tw-text-center tw-text-lg tw-text-gray-200">
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem, ipsum.</li>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem ipsum dolor sit.</li>
            </ul>
            <button
              onClick={() => {
                setShowSignupForm(true);
                //setEmail('');
                //setPassword('');
                setError(null);
                setSelectedPriceType('yearly');
              }}
              className="btn tw-mt-8 !tw-w-full tw-transition-transform tw-duration-[0.3s] hover:tw-scale-x-[1.02]"
            >
              Sign Up
            </button>
          </div>
        </div>
      </section>
        
        <section
            class="tw-flex tw-w-full tw-flex-col tw-place-content-center tw-place-items-center tw-gap-[10%] tw-p-[5%] tw-px-[10%]"
        >
 
            <div
                class="tw-mt-20 tw-flex tw-flex-col tw-place-items-center tw-gap-4"
            >
                <div class="tw-text-3xl max-md:tw-text-2xl tw-text-gray-400">
                    Still have questions?
                </div>
                <a
                    href="http://"
                    class="btn !tw-rounded-full !tw-border-[1px] !tw-border-solid !tw-border-gray-300 !tw-bg-transparent tw-transition-colors tw-duration-[0.3s]"
                >
                    Contact
                </a>
            </div>
        </section>  
         
     

    </div>
     
  );
}

export default App;
