import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registerUser(newUser, this.props.history);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.errors) {
      return { ...state, errors: props.errors };
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container mt-5 mb-5 col-md-8">
        <h1 className="text-primary display-4 text-center">Sign Up</h1>
        <p className="lead text-center">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form noValidate className="form" onSubmit={this.onSubmit}>
          <TextFieldGroup
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
          />
          <TextFieldGroup
            type="email"
            name="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={this.onChange}
            info="This site uses Gravatar so if you want a profile image, use a
            Gravatar email"
            error={errors.email}
          />
          <TextFieldGroup
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
          />
          <TextFieldGroup
            name="password2"
            type="password"
            placeholder="Confirm Password"
            value={this.state.password2}
            onChange={this.onChange}
            error={errors.password2}
          />
          <input
            type="submit"
            className="btn btn-success btn-lg btn-block"
            value="Register"
          />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
