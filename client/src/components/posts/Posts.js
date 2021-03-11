import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/postActions";
import Spinner from "../common/Spinner";
import PostFeed from "./PostFeed";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    const { isAuthenticated } = this.props.auth;
    let postContent;
    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <PostFeed posts={posts} isAuthenticated={isAuthenticated} />
      );
    }

    return (
      <div className="feed mt-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {isAuthenticated ? <PostForm /> : null}
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPosts })(Posts);
