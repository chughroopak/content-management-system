import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addComment } from "../../actions/postActions";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (Object.keys(props.errors).length !== 0) {
      return {
        ...state,
        errors: props.errors
      };
    }
    return null;
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { user } = this.props.auth;
    const { postId } = this.props;
    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addComment(postId, newPost);
    this.setState({ text: "" });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className='post-form mb-3'>
        <div className='card'>
          <div className='card-header bg-primary text-light'>
            <h5 className='font-weight-light'>Make a comment...</h5>
          </div>
          <div className='card-body'>
            <form onSubmit={this.onSubmit}>
              <TextAreaFieldGroup
                name='text'
                value={this.state.text}
                onChange={this.onChange}
                placeholder='Reply to post'
                error={errors.text}
              />
              <input type='submit' className='btn btn-primary' value='Submit' />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addComment })(CommentForm);
