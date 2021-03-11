import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AuthAlert extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    const alert = (
      <div className="alert alert-danger">
        You'll need to log in before you can share or react to any posts. You
        can still browse and view discussions.
      </div>
    );
    const blank = <div></div>;
    if (!isAuthenticated) {
      return alert;
    } else return blank;
  }
}

AuthAlert.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(AuthAlert);
