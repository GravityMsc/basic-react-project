const authLogin = (token) => {
  // put your auth code here to confirm users' role
  // return boolean
  console.log('auth action', token);
  return true; // temporary
};
const fetchToken = async ({ url, username, password }) => {
  const response = await fetch(/* auth url */url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const res = await response.json();
  return res;
};

export {
  authLogin,
  fetchToken,
};
