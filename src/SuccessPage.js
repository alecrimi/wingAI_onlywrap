// SuccessPage.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SuccessPage() {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get('session_id');
    
    // Call your function to check payment status
    handlePaymentSuccess(sessionId);
  }, [location]);

  return <div>Payment Successful!</div>;
}

export default SuccessPage;