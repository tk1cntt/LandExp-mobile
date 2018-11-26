/* eslint-disable react/no-access-state-in-setstate */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Flex, NavBar, WhiteSpace, WingBlank } from 'antd-mobile';
import { Icon } from 'antd';

import SearchHeader from 'components/SearchHeader';
import history from '../../history';
import Link from '../../components/Link';
import Footer from '../../components/Footer';
import login from '../../actions/login';

import s from './Login.css';

class Login extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  state = {
    open: false,
    usernameOrEmail: 'user',
    password: 'user',
  };

  onOpenChange = () => {
    this.setState({ open: !this.state.open });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { usernameOrEmail, password } = this.state;
    this.props.login({ username: usernameOrEmail, password });
  };

  render() {
    const { usernameOrEmail, password } = this.state;
    if (this.props.isAuthenticated) {
      // window.location = '/';
      history.push('/');
    }
    return (
      <div style={{ height: '100%' }}>
        <SearchHeader />
        <div className="flex-container">
          <WingBlank className={s.root} size="sm">
            <h1>{this.props.title}</h1>
            <p className={s.lead}>
              Log in with your username or company email address.
            </p>
            <form onSubmit={this.handleSubmit}>
              <div className={s.formGroup}>
                <label className={s.label} htmlFor="usernameOrEmail">
                  Username or email address:
                  <input
                    className={s.input}
                    id="usernameOrEmail"
                    type="text"
                    name="usernameOrEmail"
                    value={usernameOrEmail}
                    onChange={e =>
                      this.setState({ usernameOrEmail: e.target.value })
                    }
                    autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                  />
                </label>
              </div>
              <div className={s.formGroup}>
                <label className={s.label} htmlFor="password">
                  Password:
                  <input
                    className={s.input}
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                </label>
              </div>
              <div className={s.formGroup}>
                <button
                  className={s.button}
                  type="submit"
                  disabled={this.props.loading}
                >
                  Log in
                </button>
              </div>
            </form>
          </WingBlank>
          <WhiteSpace size="md" />
          <Flex>
            <Flex.Item>
              <Footer />
            </Flex.Item>
          </Flex>
        </div>
      </div>
    );
  }
}

Login.defaultProps = {
  loading: false,
  isAuthenticated: false,
};

Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapState = state => ({
  loading: state.auth.loading,
  isAuthenticated: state.session.isAuthenticated,
});

const mapDispatch = {
  login,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(Login));
