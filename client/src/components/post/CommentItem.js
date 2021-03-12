import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/postActions";
import classNames from "classnames";

class CommentItem extends Component {
  onDeleteClick = (postId, commentId) => {
    this.props.deleteComment(postId, commentId);
  };

  render() {
    const { comment, postId, auth } = this.props;
    return (
      <div className="card card-body mb-4">
        <div className="row">
          <div className="col-md-2 col-sm-3" align="center">
            <img src={comment.avatar} alt="" className="rounded-circle" />
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div
            className={classNames("", {
              "col-md-9 col-sm-8": comment.user === auth.user.id,
              "col-md-10 col-sm-9": comment.user !== auth.user.id,
            })}
          >
            <p className="lead text-wrap" style={{ fontSize: "18px" }}>
              {comment.text}
            </p>
          </div>
          {comment.user === auth.user.id ? (
            <div className="col-md-1 col-sm-1">
              <button
                type="button"
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                className="btn btn-danger mr-1 mb-1 float-right"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          ) : null}
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
