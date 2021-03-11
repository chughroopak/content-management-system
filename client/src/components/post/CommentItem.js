import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/postActions";

class CommentItem extends Component {
  onDeleteClick = (postId, commentId) => {
    this.props.deleteComment(postId, commentId);
  };

  render() {
    const { comment, postId, auth } = this.props;
    return (
      <div className="card card-body mb-4">
        <div className="row">
          <div className="col-md-2 col-3">
            <img src={comment.avatar} alt="" className="rounded-circle" />
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10 col-4">
            <p className="lead">
              {comment.text} <br />
              {comment.user === auth.user.id ? (
                <button
                  type="button"
                  onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                  className="btn btn-danger mr-1 mb-1"
                >
                  <i className="fas fa-times"></i>
                </button>
              ) : null}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deleteComment })(CommentItem);
