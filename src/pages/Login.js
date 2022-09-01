import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actionLogin } from '../actions';
import '../style/Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    validFields: false,
    loginDone: false,
  }

  login = () => {
    const { email } = this.state;
    const { saveEmail } = this.props;
    saveEmail(email);
    this.setState({ loginDone: true });
  }

  validField = () => {
    const magicNumber = 5;
    const { email, password } = this.state;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = re.test(email);
    const validPassword = password.length > magicNumber;
    if (validEmail && validPassword) {
      this.setState({ validFields: true });
    } else {
      this.setState({ validFields: false });
    }
  }

  saveInput = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    }, () => this.validField());
  }

  render() {
    const { email, password, loginDone, validFields } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email:
          {' '}
          <input
            data-testid="email-input"
            type="email"
            onChange={ this.saveInput }
            value={ email }
            id="email"
          />
        </label>
        <label htmlFor="password">
          Senha:
          {' '}
          <input
            data-testid="password-input"
            type="password"
            onChange={ this.saveInput }
            value={ password }
            id="password"
          />
        </label>
        <button
          type="button"
          disabled={ !validFields }
          onClick={ this.login }
        >
          Entrar
        </button>
        { loginDone && <Redirect to="/carteira" /> }
      </form>
    );
  }
}

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(actionLogin(email)),
});

export default connect(null, mapDispatchToProps)(Login);
