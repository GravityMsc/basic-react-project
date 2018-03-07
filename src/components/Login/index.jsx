import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { saveToken } from './action';
import getURLParameters from '../../util/urlTools';
import { authLogin } from '../../util/auth';

class Login extends React.PureComponent {
  state = {};
  componentDidMount() {
    const queryObj = getURLParameters(this.props.location.pathname);
    if (Object.hasOwnProperty.call(queryObj, 'SSOCode')) {
      const { SSOCode } = queryObj;

      // TODO: Transfer SSOCode to Token
      const SSOToken = Code2Token(SSOCode) || ''; //eslint-disable-line

      if (SSOToken) {
        this.props.saveToken(SSOToken);
      }
    }
  }
  render() {
    const { token } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const isValid = authLogin(token);
    return isValid ?
      <Redirect to={from} />
      :
      <div>Login</div>;
  }
}
Login.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    state: PropTypes.object,
  }).isRequired,
  token: PropTypes.string.isRequired,
  saveToken: PropTypes.func.isRequired,
};

const stateToProps = state => ({
  token: state.login.token,
});
const DispatchToProps = dispatch =>
  bindActionCreators({
    saveToken,
  }, dispatch);

export default connect(stateToProps, DispatchToProps)(Login);
