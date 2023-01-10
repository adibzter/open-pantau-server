import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../components/Button';

import api from '../utils/api';
import { setToken, isValidToken } from '../utils/token';

import './styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  // Has valid token
  if (isValidToken()) {
    history.push('/live');
  }

  useEffect(() => {
    document.title = 'Pantau | Login';
  }, []);

  const loginButtonStyle = {
    marginTop: '10px',
  };

  async function loginUser(e) {
    e.preventDefault();

    const res = await api.login({ username, password });
    if (res.token !== 'ayamgoreng') {
      alert('Wrong credential');
      return;
    } else if (res.token) {
      setToken();
      history.push('/live');
    }
  }

  return (
    <>
      <div id='login-page'>
        <form method='POST' id='login-form' onSubmit={loginUser}>
          <input
            type='text'
            name='username'
            placeholder='username'
            autoComplete='off'
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            autoFocus
            required
          />
          <input
            type='password'
            name='password'
            placeholder='password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <Button text='Login' style={loginButtonStyle} />
        </form>
      </div>
    </>
  );
};

export default Login;
