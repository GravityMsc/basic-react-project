import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Login from './index';
import authLogin from '../../util/auth';

const wrapLogin = ({ token, component: Component, ...rest }) => {
  const isLogin = authLogin(token);
  const newLocation = { ...this.props.location, state: { from: this.props.location.pathname } };
  return isLogin ?
    <Component {...rest} />
    :
    <Login location={newLocation} />;
};
wrapLogin.propTypes = {
  token: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};
const stateToProps = state => ({
  token: state.login.token,
});
export default withRouter(connect(stateToProps)(wrapLogin));
