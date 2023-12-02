import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleLogin = async () => {
    try {
      const tokenRequest = {
        client_id: '6fab4d0a-6102-4e8f-b2b5-c2016bcefe9a',
        client_secret: '4cGyfQAaVI',
        grant_type: 'client_credentials',
      };

      const tokenResponse = await axios.post('https://chfs.verify.ibm.com/v1.0/endpoint/default/token', tokenRequest);
      const accessToken = tokenResponse.data.access_token;

      const authRequest = {
        username,
        password,
      };

      const authResponse = await axios.post('https://chfs.verify.ibm.com/v2.0/Users/authentication?returnUserRecord=true', authRequest, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const samlResponse = authResponse.data;

      // Handle SAML response
      // This will depend on your specific use case
      if (agreed) {
        // Send SAML response to the browser
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-2 px-4">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="agreement" className="ml-2 block text-sm text-gray-900">
            I agree to the terms and conditions
          </label>
        </div>
        <button
          onClick={handleLogin}
          className="mt-3 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Login;