export const TOKEN = 'TOKEN';

const setToken = token => ({
  type: TOKEN,
  token,
});
export const saveToken = token => (dispatch) => {
  window.localStorage.removeItem('token');
  window.localStorage.setItem('token', token);
  dispatch(setToken(token));
};
export const getToken = () => (dispatch) => {
  const token = window.localStorage.getItem('token') || '';
  dispatch(setToken(token));
};
