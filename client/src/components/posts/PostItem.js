import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost, addLike, unLike } from "../../actions/postActions";

class PostItem extends Component {
  onDeleteClick = (id) => {
    this.props.deletePost(id);
  };

  onLikeClick = (id) => {
    this.props.addLike(id);
  };

  onUnlikeClick = (id) => {
    this.props.unLike(id);
  };

  findUserLike = (likes) => {
    const { auth } = this.props;
    if (likes.filter((like) => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { post, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3 post">
        <div className="row">
          <div className="col-md-2 col-4">
            <img className="rounded-circle" src={post.avatar} alt="" />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10 col-8">
            <p className="lead">{post.text}</p>
            <Link
              to={`/post/${post._id}`}
              className="btn btn-success mr-1 mb-1"
            >
              Discussion{" "}
              <span className="comment-count">{post.comments.length}</span>
            </Link>
            {showActions ? (
              <span>
                <button
                  type="button"
                  onClick={this.onLikeClick.bind(this, post._id)}
                  className="btn btn-light mr-1 mb-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes),
                    })}
                  ></i>
                  <span> {post.likes.length}</span>
                </button>
                <button
                  type="button"
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  className="btn btn-light mr-1 mb-1"
                >
                  <i className="fas text-primary fa-thumbs-down"></i>
                </button>
                {post.user === auth.user.id ? (
                  <button
                    type="button"
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    className="btn btn-danger mr-1 mb-1"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  showActions: PropTypes.bool.isRequired,
};

PostItem.defaultProps = {
  showActions: true,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost, addLike, unLike })(
  PostItem
);
