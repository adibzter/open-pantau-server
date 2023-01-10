function getToken() {
  return localStorage.getItem('token');
}

function setToken() {
  const now = Math.floor(Date.now() / 60000); // Get current time in minute
  localStorage.setItem('token', now);
}

function deleteToken() {
  localStorage.setItem('token', null);
}

function isValidToken() {
  let token = getToken();
  if (isNaN(token)) {
    deleteToken();
    return false;
  }
  token = Number(token);

  const now = Math.floor(Date.now() / 60000); // Get current time in minute

	// Sign out after 15 minutes
  if (now - token < 15) {
    setToken();
    return true;
  } else {
    deleteToken();
    return false;
  }
}

export { setToken, isValidToken, deleteToken };
