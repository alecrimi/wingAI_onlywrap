import React, { useState } from 'react';
import supabase from './supabaseClient';
import stripePromise from './Stripe';
import { Elements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom'; 
import './css/tailwind-build.css'; // Include any required CSS
import './css/index.css'; // Include any additional styles
import AnimatedLandingPage from './animated-landing-template';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();  // Initialize navigate


  const handleSignUp = async () => {
    try {
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
     // setUser(user);
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
 
    window.location.href = 'http://localhost:3001/proxy'; // Redirect to your proxy endpoint   
    
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
      const response = await fetch('http://localhost:3001/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Check if the response is ok
      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }
  
      // Parse the response body only once
      const { id: sessionId } = await response.json();
  
      // Wait for the Stripe object to be initialized
      const stripe = await stripePromise;
  
      // Redirect to Stripe Checkout with the session ID
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,  // Pass the session ID here
      });
  
      // Handle errors in redirection
      if (error) {
        throw error;
      }
    } catch (error) {
      setError(error.message);
    }
  };
  
  //handleCheckout();

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
          

          <div className="tw-mx-4 tw-flex tw-place-items-center tw-gap-[20px] tw-text-base max-md:tw-w-full max-md:tw-flex-col tw-items-end max-md:tw-place-content-center">
 
       
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="tw-p-2 tw-border tw-rounded   md:tw-w-1/2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="tw-p-2 tw-border tw-rounded   md:tw-w-1/2"
          />
          
          <button onClick={handleSignUp}>Sign Up</button>

            <a
              href="#"
              aria-label="login"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="btn tw-ml-auto tw-bg-[#7e22ce85] tw-shadow-lg tw-shadow-primary tw-transition-transform tw-duration-[0.3s] hover:tw-scale-x-[1.03]"
            >
              <span>LogIn</span>
            </a>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}       
        </>
      )}
         <AnimatedLandingPage />;


         <section
            class="tw-mt-5 tw-flex tw-w-full tw-flex-col tw-place-items-center tw-p-[2%]"
            id="pricing"
        >
            <h3
                class="tw-text-3xl tw-font-medium tw-text-gray-300 max-md:tw-text-2xl"
            >
                Choose Your Plan
            </h3> 

            <div
                class="tw-mt-10 tw-flex tw-flex-wrap tw-place-content-center tw-gap-8 max-lg:tw-flex-col"
            >
                <div
                    class="reveal-up tw-flex tw-w-[380px] tw-flex-col tw-place-items-center tw-gap-2 tw-rounded-lg tw-border-[1px] tw-border-outlineColor tw-bg-secondary tw-p-8 tw-shadow-xl max-lg:tw-w-[320px]"
                >
                    <h3 class="">
                        <span class="tw-text-5xl tw-font-semibold tw-text-gray-400">$9</span>
                        <span class="tw-text-2xl tw-text-gray-400">/month</span>
                    </h3>
                    <p class="tw-mt-3 tw-text-center tw-text-gray-300">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ab, explicabo!
                    </p>
                    <hr />
                    <ul
                        class="tw-mt-4 tw-flex tw-flex-col tw-gap-2 tw-text-center tw-text-lg tw-text-gray-200"
                    >
                        <li>Lorem ipsum dolor sit amet.</li>
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum dolor.</li>
                        <li>Lorem ipsum dolor sit.</li>
                    </ul>
                    <a
                        href="http://"
                        class="btn tw-mt-8 !tw-w-full tw-transition-transform tw-duration-[0.3s] hover:tw-scale-x-[1.02]"
                    >
                        Get now
                    </a>
                </div>
                <div
                    class="reveal-up tw-flex tw-w-[380px] tw-flex-col tw-place-items-center tw-gap-2 tw-rounded-lg tw-border-2 tw-border-primary tw-bg-secondary tw-p-8 tw-shadow-xl max-lg:tw-w-[320px]"
                >
                    <h3 class="">
                        <span class="tw-text-5xl tw-font-semibold  tw-text-gray-400">$19</span>
                        <span class="tw-text-2xl tw-text-gray-400">/year</span>
                    </h3>
                    <p class="tw-mt-3 tw-text-center tw-text-gray-300">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ab, explicabo!
                    </p>
                    <hr />
                    <ul
                        class="tw-mt-4 tw-flex tw-flex-col tw-gap-2 tw-text-center tw-text-lg tw-text-gray-200"
                    >
                        <li>Lorem ipsum dolor sit amet.</li>
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum dolor.</li>
                        <li>Lorem ipsum dolor sit.</li>
                    </ul>
                    <a
                        href="http://"
                        class="btn tw-mt-8 !tw-w-full tw-transition-transform tw-duration-[0.3s] hover:tw-scale-x-[1.02]"
                    >
                        Get now
                    </a>
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
