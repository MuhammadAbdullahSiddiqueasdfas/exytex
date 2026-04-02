import React, { useState } from 'react';

export const DebugLogin: React.FC = () => {
  const [results, setResults] = useState<string[]>([]);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testHealth = async () => {
    try {
      addResult('🔍 Testing health endpoint...');
      const response = await fetch('http://localhost:5000/api/health');
      const data = await response.json();
      addResult(`✅ Health check successful: ${JSON.stringify(data)}`);
    } catch (error: any) {
      addResult(`❌ Health check failed: ${error.message}`);
    }
  };

  const testLogin = async () => {
    try {
      addResult('🔍 Testing login...');
      addResult(`📤 Sending: username="${username}", password="${password}"`);
      
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      
      addResult(`📥 Response status: ${response.status} ${response.statusText}`);
      
      const data = await response.json();
      addResult(`📥 Response data: ${JSON.stringify(data, null, 2)}`);
      
      if (response.ok && data.success) {
        addResult(`✅ Login successful!`);
        addResult(`🔑 Token received: ${data.token.substring(0, 30)}...`);
        
        // Test storing token
        localStorage.setItem('adminToken', data.token);
        addResult(`💾 Token stored in localStorage`);
        
        // Test token verification
        const verifyResponse = await fetch('http://localhost:5000/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${data.token}`
          }
        });
        const verifyData = await verifyResponse.json();
        addResult(`🔐 Token verification: ${JSON.stringify(verifyData)}`);
        
      } else {
        addResult(`❌ Login failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error: any) {
      addResult(`❌ Login request failed: ${error.message}`);
    }
  };

  const clearResults = () => {
    setResults([]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔧 Debug Login Test</h1>
      
      <div className="mb-4 space-y-2">
        <div>
          <label className="block text-sm font-medium">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
      </div>
      
      <div className="space-x-2 mb-4">
        <button
          onClick={testHealth}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Test Health
        </button>
        <button
          onClick={testLogin}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Test Login
        </button>
        <button
          onClick={clearResults}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Clear
        </button>
      </div>
      
      <div className="bg-gray-100 p-4 rounded max-h-96 overflow-y-auto">
        <h3 className="font-bold mb-2">Results:</h3>
        {results.length === 0 ? (
          <p className="text-gray-500">No results yet. Click a button to test.</p>
        ) : (
          <div className="space-y-1">
            {results.map((result, index) => (
              <div key={index} className="text-sm font-mono">
                {result}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};