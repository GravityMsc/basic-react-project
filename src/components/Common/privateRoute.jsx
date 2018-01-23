import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({ token, component: Component, ...rest }) => {
  const authLogin = () => {
    // put your auth code here to confirm users' role
    // return boolean
  };
  return (
    <Route
      {...rest}
      render={props => (
        authLogin() ?
          <Component {...props} />
          :
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location },
          }}
          />
      )}
    />
  );
};
PrivateRoute.propTypes = {
  token: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired, // can't use PropTypes.element
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    state: PropTypes.object,
  }).isRequired,
};

const stateToProps = state => ({
  token: state.login.token,
});
export default connect(stateToProps)(PrivateRoute);
