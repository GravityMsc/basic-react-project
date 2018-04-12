const updateState = data => (dispatch) => {
  dispatch({
    type: 'UPDATE_STATE',
    data,
  });
  return Promise.resolve();
};
export default updateState;

// you can use it in component:

// this.props.dispatch(updateState(data)).then(() => {
//   console.log(this.props.data);
// });

// not attempt async & await yet
