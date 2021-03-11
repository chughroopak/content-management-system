import React, { Component } from "react";
import PropTypes from "prop-types";
import PostItem from "./PostItem";

class PostFeed extends Component {
  render() {
    const { posts, isAuthenticated } = this.props;
    return posts.map((post) => (
      <PostItem key={post._id} post={post} showActions={isAuthenticated} />
    ));
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default PostFeed;
