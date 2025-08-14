import { useState } from 'react';

export default function ApiTest() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const testApi = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      console.log('API URL:', apiUrl);
      
      const response = await fetch(`${apiUrl}/`);
      const data = await response.json();
      
      console.log('API Response:', data);
      setStatus(`API is working! Response: ${JSON.stringify(data)}`);
    } catch (error) {
      console.error('API Error:', error);
      setStatus(`API Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">API Test</h3>
      <button 
        onClick={testApi} 
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test API Connection'}
      </button>
      {status && (
        <div className="mt-2 p-2 bg-gray-100 rounded">
          <p className="text-sm">{status}</p>
        </div>
      )}
    </div>
  );
}
