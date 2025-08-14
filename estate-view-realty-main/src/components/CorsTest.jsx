import { useState } from 'react';

export default function CorsTest() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const testCors = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      console.log('Testing CORS with API URL:', apiUrl);
      
      // Test the health endpoint
      const healthResponse = await fetch(`${apiUrl}/`);
      const healthData = await healthResponse.json();
      console.log('Health endpoint response:', healthData);
      
      // Test the CORS endpoint
      const corsResponse = await fetch(`${apiUrl}/api/cors-test`);
      const corsData = await corsResponse.json();
      console.log('CORS test response:', corsData);
      
      setStatus(`✅ CORS is working! Health: ${healthData.message}, CORS: ${corsData.message}`);
    } catch (error) {
      console.error('CORS Test Error:', error);
      setStatus(`❌ CORS Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testSignin = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      console.log('Testing signin endpoint with API URL:', apiUrl);
      
      const response = await fetch(`${apiUrl}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@test.com',
          password: 'test123'
        }),
      });
      
      const data = await response.json();
      console.log('Signin test response:', data);
      
      setStatus(`✅ Signin endpoint accessible! Status: ${response.status}, Message: ${data.message || 'No message'}`);
    } catch (error) {
      console.error('Signin Test Error:', error);
      setStatus(`❌ Signin Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white/90">
      <h3 className="text-lg font-semibold mb-4">CORS & API Test</h3>
      <div className="space-y-2">
        <button 
          onClick={testCors} 
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test CORS'}
        </button>
        <button 
          onClick={testSignin} 
          disabled={loading}
          className="w-full px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Signin Endpoint'}
        </button>
      </div>
      {status && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="text-sm font-mono">{status}</p>
        </div>
      )}
    </div>
  );
}
