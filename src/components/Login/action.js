export const TOKEN = 'TOKEN';

const setToken = token => ({
  type: TOKEN,
  token,
});

export const fetchToken = ({ username, password }) => async (dispatch) => {
  const response = await fetch(''/* auth url */, {
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
  dispatch(setToken(res.token));

  window.localStorage.removeItem('token');
  window.localStorage.setItem('token', res.token);
};
export const getToken = () => (dispatch) => {
  const token = window.localStorage.getItem('token') || '';
  dispatch(setToken(token));
};
