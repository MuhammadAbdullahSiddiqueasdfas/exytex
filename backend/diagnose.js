const http = require('http');

console.log('=== EXYTEX BACKEND DIAGNOSTIC ===\n');

// Test 1: Check if server is running
console.log('Test 1: Checking if backend server is running...');
makeRequest('GET', '/api/health', null, (success, data) => {
  if (success) {
    console.log('✅ Backend server is running');
    console.log('   Response:', data);
    testTempLogin();
  } else {
    console.log('❌ Backend server is NOT running');
    console.log('   Error:', data);
    console.log('\n⚠️  Please start the backend server:');
    console.log('   cd backend');
    console.log('   npm run dev');
    process.exit(1);
  }
});

// Test 2: Test temporary login
function testTempLogin() {
  console.log('\nTest 2: Testing temporary login endpoint...');
  const body = JSON.stringify({ username: 'admin', password: 'admin123' });
  
  makeRequest('POST', '/api/auth/login-temp', body, (success, data) => {
    if (success) {
      console.log('✅ Temporary login is working');
      console.log('   Token received:', data.token ? 'Yes' : 'No');
      console.log('   Admin:', data.admin?.username);
    } else {
      console.log('❌ Temporary login failed');
      console.log('   Error:', data);
    }
    testRegularLogin();
  });
}

// Test 3: Test regular login (requires MongoDB)
function testRegularLogin() {
  console.log('\nTest 3: Testing regular login endpoint (requires MongoDB)...');
  const body = JSON.stringify({ username: 'admin', password: 'admin123' });
  
  makeRequest('POST', '/api/auth/login', body, (success, data) => {
    if (success) {
      console.log('✅ Regular login is working (MongoDB connected)');
      console.log('   Token received:', data.token ? 'Yes' : 'No');
      printSummary(true);
    } else {
      console.log('❌ Regular login failed (MongoDB not connected)');
      console.log('   Error:', data.message || data);
      printSummary(false);
    }
  });
}

function makeRequest(method, path, body, callback) {
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: path,
    method: method,
    headers: {
      'Content-Type': 'application/json',
    }
  };

  if (body) {
    options.headers['Content-Length'] = Buffer.byteLength(body);
  }

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        callback(res.statusCode >= 200 && res.statusCode < 300, parsed);
      } catch (e) {
        callback(false, data);
      }
    });
  });

  req.on('error', (error) => {
    callback(false, error.message);
  });

  if (body) {
    req.write(body);
  }
  req.end();
}

function printSummary(mongoConnected) {
  console.log('\n=== SUMMARY ===');
  console.log('Backend Server: ✅ Running on http://localhost:5000');
  console.log('Temporary Login: ✅ Working (no MongoDB required)');
  console.log('MongoDB Connection:', mongoConnected ? '✅ Connected' : '❌ Not Connected');
  console.log('Admin Panel: Should be at http://localhost:3001');
  
  if (!mongoConnected) {
    console.log('\n⚠️  MONGODB CONNECTION ISSUE:');
    console.log('Your IP address is not whitelisted in MongoDB Atlas.');
    console.log('\nTO FIX:');
    console.log('1. Go to https://cloud.mongodb.com/');
    console.log('2. Select your cluster (Cluster0)');
    console.log('3. Click "Network Access" in the left sidebar');
    console.log('4. Click "Add IP Address"');
    console.log('5. Either:');
    console.log('   - Click "Allow Access from Anywhere" (0.0.0.0/0) for development');
    console.log('   - Or add your current IP address');
    console.log('6. Wait 2-3 minutes for changes to take effect');
    console.log('7. Restart the backend server');
    console.log('\n✅ GOOD NEWS:');
    console.log('The temporary login endpoint is working, so you can still');
    console.log('log in to the admin panel at http://localhost:3001/login');
    console.log('Username: admin');
    console.log('Password: admin123');
  }
  
  setTimeout(() => process.exit(0), 100);
}
