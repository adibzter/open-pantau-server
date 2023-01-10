import { API_SERVER } from './config';

async function login({ username, password }) {
  const res = await fetch(`${API_SERVER}/api/login`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  return res.json();
}

async function subscribe(subscription) {
  const res = await fetch(`${API_SERVER}/api/notification/subscribe`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  });

  return res.json();
}

export default { login, subscribe };
