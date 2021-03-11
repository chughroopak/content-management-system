import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(user);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.auth.isAuthenticated) {
      props.history.push("/");
    }

    if (props.errors) {
      return {
        ...state,
        errors: props.errors,
      };
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container mt-5 mb-5" style={{ height: "475px" }}>
        <h1 className="text-primary display-4 text-center">Sign In</h1>
        <p className="lead text-center">
          <i className="fas fa-user"></i> Sign into Your Account
        </p>
        <form className="form" noValidate onSubmit={this.onSubmit}>
          <TextFieldGroup
            type="email"
            name="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
          />
          <TextFieldGroup
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
          />
          <input
            type="submit"
            className="btn btn-success btn-block btn-lg"
            value="Login"
          />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
