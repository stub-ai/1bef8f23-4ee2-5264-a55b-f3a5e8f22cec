import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      alert('You must agree to the terms and conditions');
      return;
    }

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
        router.push('/user-agreement', { query: { samlResponse } });
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please check your username and password.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} /> I agree to the terms and conditions
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;