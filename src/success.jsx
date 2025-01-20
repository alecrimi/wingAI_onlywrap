import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Success() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');
  const location = useLocation();

  useEffect(() => {
    // Get session_id from URL search params
    const params = new URLSearchParams(location.search);
    const session_id = params.get('session_id');
    
    if (session_id) {
      verifyPaymentAndCreateUser(session_id);
    }
  }, [location]);

  const verifyPaymentAndCreateUser = async (sessionId) => {
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { success, metadata } = await response.json();

      if (success) {
        const { error } = await supabase.auth.signUp({
          email: metadata.email,
          password: metadata.password,
        });

        if (error) throw error;

        setStatus('completed');
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (error) {
      console.error('Error processing signup:', error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <h1 className="text-2xl mb-4">Payment Status</h1>
      {status === 'processing' && <p>Processing your payment...</p>}
      {status === 'completed' && <p>Success! Redirecting to dashboard...</p>}
      {status === 'error' && (
        <div>
          <p>Error processing your payment.</p>
          <p>Please contact support or try again.</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Return to Home
          </button>
        </div>
      )}
    </div>
  );
}

export default Success;