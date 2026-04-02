import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const DebugPage: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const navigate = useNavigate();

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const testTempLogin = async () => {
    addLog('🔐 Testing temporary login...');
    try {
      const response = await fetch('http://localhost:5000/api/auth/login-temp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      addLog(`Response: ${JSON.stringify(data)}`);
      
      if (data.success) {
        addLog('✅ Login successful!');
        addLog(`Token: ${data.token.substring(0, 50)}...`);
        localStorage.setItem('adminToken', data.token);
        addLog('💾 Token saved to localStorage');
      } else {
        addLog(`❌ Login failed: ${data.message}`);
      }
    } catch (error: any) {
      addLog(`❌ Error: ${error.message}`);
    }
  };

  const testVerify = async () => {
    addLog('🔍 Testing token verification...');
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      addLog('❌ No token in localStorage');
      return;
    }
    
    addLog(`Token: ${token.substring(0, 50)}...`);
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/verify', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      addLog(`Response: ${JSON.stringify(data)}`);
      
      if (data.success) {
        addLog('✅ Token valid!');
      } else {
        addLog('❌ Token invalid');
      }
    } catch (error: any) {
      addLog(`❌ Error: ${error.message}`);
    }
  };

  const checkLocalStorage = () => {
    const token = localStorage.getItem('adminToken');
    addLog(`Token in localStorage: ${token ? 'YES' : 'NO'}`);
    if (token) {
      addLog(`Token: ${token.substring(0, 50)}...`);
    }
  };

  const clearToken = () => {
    localStorage.removeItem('adminToken');
    addLog('🗑️ Token cleared');
  };

  const goToDashboard = () => {
    addLog('🚀 Navigating to dashboard...');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">🔧 Debug Login</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Credentials</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-2 mb-2 bg-gray-700 rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>

        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={testTempLogin}
              className="bg-blue-600 hover:bg-blue-700 p-3 rounded"
            >
              Test Temp Login
            </button>
            <button
              onClick={testVerify}
              className="bg-green-600 hover:bg-green-700 p-3 rounded"
            >
              Test Verify
            </button>
            <button
              onClick={checkLocalStorage}
              className="bg-purple-600 hover:bg-purple-700 p-3 rounded"
            >
              Check Token
            </button>
            <button
              onClick={clearToken}
              className="bg-red-600 hover:bg-red-700 p-3 rounded"
            >
              Clear Token
            </button>
            <button
              onClick={goToDashboard}
              className="bg-yellow-600 hover:bg-yellow-700 p-3 rounded col-span-2"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => setLogs([])}
              className="bg-gray-600 hover:bg-gray-700 p-3 rounded col-span-2"
            >
              Clear Logs
            </button>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Logs</h2>
          <div className="bg-black p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <div className="text-gray-500">No logs yet. Click a button to test.</div>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="mb-1">{log}</div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
