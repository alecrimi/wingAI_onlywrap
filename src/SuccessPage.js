// src/SuccessPage.js
import React, { useEffect, useState } from 'react';

const SuccessPage = () => {
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('session_id');
    setSessionId(id);

    // Optionally, use the session ID to confirm the payment with your backend or Stripe
  }, []);

  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Your payment was successful. Session ID: {sessionId}</p>
    </div>
  );
};

export default SuccessPage;
