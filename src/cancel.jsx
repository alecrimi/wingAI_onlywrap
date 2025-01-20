import { useNavigate } from 'react-router-dom';

function Cancel() {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <h1 className="text-2xl mb-4">Payment Cancelled</h1>
      <p>Your payment was cancelled. No charges were made.</p>
      <button 
        onClick={() => navigate('/')}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Try Again
      </button>
    </div>
  );
}

export default Cancel;